import { InputChain } from "../helpers/input/InputChain";
import { UserInput } from "../helpers/input/ActionTypes";
import { PlayerActionScript } from "../helpers/movement_scripts/PlayerActionScript";
import { PhysicsModelAdapter } from "./PhysicsModelAdapter";
import { InputDirectionControl } from "../helpers/input/InputDirectionControl";
import { ObjectModel } from "../ObjectModel";
import {ModelCollection} from "../ModelCollection";

export interface PersistantAcceleration {
    x: -1 | 0 | 1;
    y: -1 | 0 | 1;
}

export interface PlayerActionScriptClass {
    new(target: ObjectModel, models: ModelCollection): PlayerActionScript
}

export interface ActionCombo {
    state_condition: Condition | null,
    input_combo: UserInput[];
    script_class: PlayerActionScriptClass;
}

export interface ControllableModelInterface {
    physics: PhysicsModelAdapter;
    // inputs
    input_chain: InputChain;
    input_direction_control: InputDirectionControl;
    // 
    action_script: PlayerActionScript | null;
    registered_combos: ActionCombo[];
}

type Condition = () => boolean;

export class ControllableModelAdapter {
    public readonly floating_velocity = 30;
    public readonly controlable_floating_velocity = 80;
    public readonly jump_force = -120;
    public readonly ground_velocity = 120;

    public constructor(protected object: ObjectModel, protected models: ModelCollection) { }

    public update(delta_seconds: number) {
        this.object.input_chain.update(delta_seconds);
        this.object.input_direction_control.update(delta_seconds);
        //
        this.update_movement_by_script(delta_seconds);
        this.update_movement_by_persistant_controls(delta_seconds);
    }

    public update_movement_by_script(delta_seconds: number) {
        if (this.object.action_script) this.object.action_script.update(delta_seconds);
        if (this.object.action_script?.is_finished) this.object.action_script = null;
        if (this.object.action_script === null || this.object.action_script.is_interuptable_by_action) {
            this.update_action_script_from_input();
        }
    }

    public handle_input(input: UserInput) {
        this.object.input_chain.input(input);
        this.object.input_direction_control.input(input);
    }

    public register_combo(script_class: PlayerActionScriptClass, state_condition: Condition | null, ...input_combo: UserInput[]): void {
        this.object.registered_combos.push({
            script_class,
            state_condition,
            input_combo
        });
    }

    public update_movement_by_persistant_controls(delta_seconds: number): void {
        if (!this.object.input_direction_control.is_in_active_control()) {
            return this.update_movement_without_control_input(delta_seconds);
        }
        // Handle Actionscript Interaction
        if (this.object.action_script?.is_disabling_movement) return;
        if (this.object.action_script?.is_interuptable_by_movement) {
            this.object.action_script = null;
        }
        //
        if (this.object.physics.object.is_grounded) {
            this.update_movement_controlled_velocity(delta_seconds);
        } else {
            this.update_movement_controlled_fall(delta_seconds);
        }
    }

    /**
     * Update the movement when no permanent input is given
     */
    public update_movement_without_control_input(delta_seconds: number) {
        if (this.object.action_script?.is_disabling_movement) return;
        if (!this.object.physics.object.is_grounded) return;
        this.update_movement_slow_down(delta_seconds);
    }

    public update_movement_controlled_velocity(delta_seconds: number) {
        const local_velocity = this.object.physics.get_local_velocity();
        if (this.object.input_direction_control.current_control.y === -1) {
            this.object.physics.set_local_velocity({
                x: this.object.input_direction_control.current_control.x * this.ground_velocity,
                y: this.jump_force,
            });
        } else {
            this.object.physics.set_local_velocity({
                x: this.object.input_direction_control.current_control.x * this.ground_velocity,
                y: local_velocity.y,
            });
        }
    }

    public update_movement_controlled_fall(delta_seconds: number) {
        const max_vel_squared = this.controlable_floating_velocity * this.controlable_floating_velocity;
        const effectiveness = Math.max(0, 1 - this.object.physics.object.velocity.len2() / max_vel_squared);
        const control_x = this.object.input_direction_control.current_control.x;
        const control_y = (this.object.input_direction_control.current_control.y * 2 + 1) / 2;
        this.object.physics.local_accelerate({
            x: control_x * 60 * delta_seconds * effectiveness,
            y: control_y * 60 * delta_seconds * effectiveness,
        });
    }

    public update_movement_slow_down(delta_seconds: number) {
        const local_velocity = this.object.physics.get_local_velocity();
        if (local_velocity.len2() < 1000) {
            this.object.physics.set_local_velocity({
                x: 0,
                y: 0,
            });
        } else {
            const drag_per_second = 0.5;
            const drag = (Math.pow(drag_per_second, delta_seconds));
            this.object.physics.set_local_velocity({
                x: local_velocity.x * drag,
                y: local_velocity.y * drag,
            });
        }
    }

    public update_action_script_from_input(): void {
        const selected_combo = this.object.registered_combos.reduce((current: ActionCombo | null, next) => {
            if (current) return current;
            if (next.state_condition && !next.state_condition()) return current;
            if (this.object.input_chain.is_combo(...next.input_combo)) return next;
            return current;
        }, null);
        if (selected_combo) {
            this.object.input_chain.clear();
            this.object.action_script = new selected_combo.script_class(this.object, this.models);
        }
    }
}