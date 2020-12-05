import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { Vector2 } from "../../tools/data/Vector2";
import { ActionChain } from "./ChainActionModel";
import { Action, InputAction, is_movement_action } from "./helpers/ActionTypes";
import { JumpScript } from "./helpers/movement_scripts/JumpScript";
import { PlayerActionScript } from "./helpers/movement_scripts/PlayerActionScript";
import { StepLeftScript } from "./helpers/movement_scripts/StepLeftScript";
import { StepRightScript } from "./helpers/movement_scripts/StepRightScript";
import { ModelCollection } from "./ModelCollection";
import { ActionCombo, ControllableModelAdapter, ControllableModelInterface, PersistantAcceleration } from "./model_adapters/ControllableModelAdapter";
import { PhysicsModelAdapter, PhysicsModelInterface } from "./model_adapters/PhysicsModelAdapter";


export class PlayerModel extends Model<ModelCollection>
    implements
    PhysicsModelInterface,
    ControllableModelInterface {
    // States
    public position: Vector2 = new Vector2;
    public velocity: Vector2 = new Vector2;
    public rotation: number = 0;
    public is_grounded: boolean = false;

    // game_stats
    public energy: number = 2;

    // input
    public action_script: PlayerActionScript | null = null;
    public input_chain: ActionChain = new ActionChain;
    public persistent_acceleration: PersistantAcceleration = { x: 0, y: 0 };
    public registered_combos: ActionCombo[] = [];

    // adapters
    public physics: PhysicsModelAdapter = new PhysicsModelAdapter(this);
    public controllable: ControllableModelAdapter = new ControllableModelAdapter(this);

    constructor() {
        super();
        this.controllable.register_combo(StepLeftScript, InputAction.MOVE_LEFT, InputAction.STOP_MOVE_LEFT);
        this.controllable.register_combo(StepRightScript, InputAction.MOVE_RIGHT, InputAction.STOP_MOVE_RIGHT);
        this.controllable.register_combo(JumpScript, InputAction.MOVE_UP, InputAction.STOP_MOVE_UP);
    }

    public update(delta_seconds: number) {
        this.controllable.update(delta_seconds);
        this.physics.update(delta_seconds);
        this.energy += delta_seconds;
    }

}