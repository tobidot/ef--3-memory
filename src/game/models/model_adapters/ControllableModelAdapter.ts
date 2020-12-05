import { Vector } from "p5";
import { Vector2 } from "../../../tools/data/Vector2";
import { ActionChain } from "../ChainActionModel";
import { InputAction } from "../helpers/ActionTypes";
import { PlayerActionScript } from "../helpers/movement_scripts/PlayerActionScript";
import { PhysicsModelAdapter } from "./PhysicsModelAdapter";

export interface PersistantAcceleration {
    x: -1 | 0 | 1;
    y: -1 | 0 | 1;
}

export interface PlayerActionScriptClass {
    new(target: PhysicsModelAdapter): PlayerActionScript
}

export interface ActionCombo {
    input_combo: InputAction[];
    script_class: PlayerActionScriptClass;
}

export interface ControllableModelInterface {
    physics: PhysicsModelAdapter;
    // inputs
    input_chain: ActionChain;
    persistent_acceleration: PersistantAcceleration;
    // 
    action_script: PlayerActionScript | null;
    registered_combos: ActionCombo[];
}

export class ControllableModelAdapter {
    public readonly floating_velocity = 80;
    public readonly ground_velocity = 300;

    public constructor(protected object: ControllableModelInterface) { }

    public update(delta_seconds: number) {
        this.object.input_chain.update(delta_seconds);
        this.update_movement_script(delta_seconds);
        this.update_persistant_controls(delta_seconds);
    }

    public update_movement_script(delta_seconds: number) {
        if (this.object.action_script) this.object.action_script.update(delta_seconds);
        if (this.object.action_script?.is_finished) this.object.action_script = null;
        if (this.object.action_script === null || this.object.action_script.is_interuptable) {
            this.update_action_script_from_input();
        }
    }

    public handle_input(input: InputAction) {
        this.object.input_chain.add(input);
        this.update_persisitant_action(input);
    }

    public update_persisitant_action(input: InputAction) {
        switch (input) {
            case InputAction.MOVE_DOWN:
                this.object.persistent_acceleration.y = -1;
                break;
            case InputAction.STOP_MOVE_DOWN:
                if (this.object.persistent_acceleration.y === -1) this.object.persistent_acceleration.y = 0;
                break;

            case InputAction.MOVE_UP:
                this.object.persistent_acceleration.y = 1;
                break;
            case InputAction.STOP_MOVE_UP:
                if (this.object.persistent_acceleration.y === 1) this.object.persistent_acceleration.y = 0;
                break;

            case InputAction.MOVE_LEFT:
                this.object.persistent_acceleration.x = -1;
                break;
            case InputAction.STOP_MOVE_LEFT:
                if (this.object.persistent_acceleration.x !== 1) this.object.persistent_acceleration.x = 0;
                break;

            case InputAction.MOVE_RIGHT:
                this.object.persistent_acceleration.x = 1;
                break;
            case InputAction.STOP_MOVE_RIGHT:
                if (this.object.persistent_acceleration.x !== -1) this.object.persistent_acceleration.x = 0;
                break;
        }
    }

    public register_combo(script_class: PlayerActionScriptClass, ...input_combo: InputAction[]): void {
        this.object.registered_combos.push({
            script_class,
            input_combo
        });
    }

    public update_persistant_controls(delta_seconds: number): void {
        if (this.object.action_script !== null) return;
        if (this.object.physics.object.is_grounded) {
            this.object.physics.set_local_velocity({
                x: this.object.persistent_acceleration.x * this.ground_velocity,
                y: 0,
            });
        } else {
            const max_vel_squared = this.floating_velocity * this.floating_velocity;
            const effectiveness = Math.max(0, this.floating_velocity - this.object.physics.object.velocity.len2() / max_vel_squared);
            this.object.physics.accelerate({
                x: this.object.persistent_acceleration.x * 60 * delta_seconds * effectiveness,
                y: this.object.persistent_acceleration.y * 60 * delta_seconds * effectiveness,
            });
        }
    }

    public update_action_script_from_input(): void {
        const selected_combo = this.object.registered_combos.reduce((current: ActionCombo | null, next) => {
            if (current) return current;
            if (this.object.input_chain.is_combo(...next.input_combo)) return next;
            return current;
        }, null);
        if (selected_combo) {
            this.object.input_chain.clear();
            this.object.action_script = new selected_combo.script_class(this.object.physics);
        }
    }
}