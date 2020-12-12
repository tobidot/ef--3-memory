import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { Vector2 } from "../../tools/data/Vector2";
import { InputChain } from "./helpers/input/InputChain";
import { UserInput } from "./helpers/input/ActionTypes";
import { JumpScript } from "./helpers/movement_scripts/JumpScript";
import { PlayerActionScript } from "./helpers/movement_scripts/PlayerActionScript";
import { StepLeftScript } from "./helpers/movement_scripts/StepLeftScript";
import { StepRightScript } from "./helpers/movement_scripts/StepRightScript";
import { ModelCollection } from "./ModelCollection";
import { ActionCombo, ControllableModelAdapter, ControllableModelInterface, PersistantAcceleration } from "./model_adapters/ControllableModelAdapter";
import { PhysicsModelAdapter, PhysicsModelInterface } from "./model_adapters/PhysicsModelAdapter";
import { ModelTable } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ModelTable";
import { PlanetModel } from "./PlanetModel";
import { InputDirectionControl } from "./helpers/input/InputDirectionControl";


export class ObjectModel extends Model<ModelCollection>
    implements
    PhysicsModelInterface,
    ControllableModelInterface {
    // States
    public position: Vector2 = new Vector2;
    public velocity: Vector2 = new Vector2;
    public rotation: number = 0;
    public is_grounded: boolean = false;
    public is_user_controlled: boolean = false;

    // game_stats
    public energy: number = 2;

    // input
    public action_script: PlayerActionScript | null = null;
    public input_chain: InputChain = new InputChain;
    public input_direction_control: InputDirectionControl = new InputDirectionControl;
    public registered_combos: ActionCombo[] = [];

    // adapters
    public physics: PhysicsModelAdapter = new PhysicsModelAdapter(this);
    public controllable: ControllableModelAdapter = new ControllableModelAdapter(this);

    constructor(collection: ModelCollection) {
        super(collection);

        const is_grounded = () => this.is_grounded;
        this.controllable.register_combo(
            StepLeftScript,
            is_grounded,
            UserInput.MOVE_LEFT,
            UserInput.STOP_MOVE_LEFT
        );
        this.controllable.register_combo(
            StepRightScript,
            is_grounded,
            UserInput.MOVE_RIGHT,
            UserInput.STOP_MOVE_RIGHT
        );
        // this.controllable.register_combo(
        //     JumpScript,
        //     is_grounded,
        //     UserInput.MOVE_UP,
        //     UserInput.STOP_MOVE_UP,
        // );
    }

    public update(delta_seconds: number) {
        this.controllable.update(delta_seconds);
        this.energy += delta_seconds;
    }

    public static create_player(table: ModelTable<ModelCollection, ObjectModel>, planet: PlanetModel) {
        const player = table.insert_new();
        player.is_user_controlled = true;
        player.position = Vector2.from_angle(Math.random() * Math.PI, planet.radius + 10);
        return player;
    }

    public static create_enemy(table: ModelTable<ModelCollection, ObjectModel>, planet: PlanetModel) {
        const player = table.insert_new();
        player.is_user_controlled = false;
        player.position = Vector2.from_angle(Math.random() * Math.PI, planet.radius + 10);
        return player;
    }


}