import {Model} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import {Vector2} from "../../tools/data/Vector2";
import {InputChain} from "./helpers/input/InputChain";
import {UserInput} from "./helpers/input/ActionTypes";
import {PlayerActionScript} from "./helpers/movement_scripts/PlayerActionScript";
import {StepLeftScript} from "./helpers/movement_scripts/StepLeftScript";
import {StepRightScript} from "./helpers/movement_scripts/StepRightScript";
import {ModelCollection} from "./ModelCollection";
import {
    ActionCombo,
    ControllableModelAdapter,
    ControllableModelInterface
} from "./model_adapters/ControllableModelAdapter";
import {PhysicsModelAdapter, PhysicsModelInterface} from "./model_adapters/PhysicsModelAdapter";
import {ModelTable} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ModelTable";
import {PlanetModel} from "./PlanetModel";
import {InputDirectionControl} from "./helpers/input/InputDirectionControl";
import {PhysicRelation} from "./GamePhysicsModel";
import {Rect} from "../../tools/data/Rect";
import {Simulate} from "react-dom/test-utils";
import {BasicPunchScript} from "./helpers/movement_scripts/BasicPunchScript";
import {HeavyPunchScript} from "./helpers/movement_scripts/HeavyPunchScript";
import {ChargedPunchScript} from "./helpers/movement_scripts/ChargedPunchScript";
import {SpecialPunchScript} from "./helpers/movement_scripts/SpecialPunchScript";


export class ObjectModel extends Model<ModelCollection>
    implements PhysicsModelInterface,
        ControllableModelInterface {
    // Configuration
    public is_user_controlled: boolean = false;
    public is_active_entity: boolean = false;
    // States
    public position: Vector2 = new Vector2;
    public velocity: Vector2 = new Vector2;
    public rotation: number = 0;
    public is_grounded: boolean = false;
    public is_enemy: boolean = false;

    // game_stats
    public is_dying: boolean = false;
    public energy: number = 2;
    public damage: number = 0;
    public collision_box: Rect = new Rect(-5, -5, 10, 10);
    public collision_radius: number = Math.sqrt(25 + 25);

    // input
    public action_script: PlayerActionScript | null = null;
    public input_chain: InputChain = new InputChain;
    public input_direction_control: InputDirectionControl = new InputDirectionControl;
    public registered_combos: ActionCombo[] = [];

    // physics caching
    public weight: number = 1;
    public caching_physics_relation: WeakMap<ObjectModel, PhysicRelation> = new WeakMap;
    public require_reset: boolean = false;

    // adapters
    public physics: PhysicsModelAdapter;
    public controllable: ControllableModelAdapter;

    constructor(collection: ModelCollection) {
        super(collection);
        this.physics = new PhysicsModelAdapter(this);
        this.controllable = new ControllableModelAdapter(this, collection);
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
        this.controllable.register_combo(
            BasicPunchScript,
            null,
            UserInput.ATTACK_WEAK,
        );
        this.controllable.register_combo(
            HeavyPunchScript,
            null,
            UserInput.ATTACK_MEDIUM,
        );
        this.controllable.register_combo(
            ChargedPunchScript,
            null,
            UserInput.ATTACK_STRONG,
        );
        this.controllable.register_combo(
            SpecialPunchScript,
            null,
            UserInput.ATTACK_SPECIAL,
        );
    }

    public update(delta_seconds: number) {
        if (this.is_active_entity) {
            this.controllable.update(delta_seconds);
        }
        this.energy += delta_seconds;
    }

    public get image(): HTMLImageElement | null {
        const image = this.models.images.all().find((image) => image.name === "green-dot");
        if (image) return image.image;
        return null;
    }

    public static create_player(table: ModelTable<ModelCollection, ObjectModel>, planet: PlanetModel) {
        const player = table.insert_new();
        player.is_user_controlled = true;
        player.is_active_entity = true;
        player.collision_box = new Rect(-20, -20, 40, 40);
        player.collision_radius = Math.sqrt(20*20);
        player.position = Vector2.from_angle(Math.random() * Math.PI * 2, planet.radius + 10);
        return player;
    }

    public static create_enemy(table: ModelTable<ModelCollection, ObjectModel>, planet: PlanetModel) {
        const player = table.insert_new();
        player.is_user_controlled = false;
        player.is_active_entity = true;
        player.is_enemy = true;
        player.collision_box = new Rect(-20, -20, 40, 40);
        player.collision_radius = Math.sqrt(20*20);
        player.weight = 0.85;
        player.position = Vector2.from_angle(Math.random() * Math.PI * 2, planet.radius + 10);
        return player;
    }


    public static create_ball(table: ModelTable<ModelCollection, ObjectModel>, planet: PlanetModel) {
        const ball = table.insert_new();
        ball.is_user_controlled = false;
        ball.weight = 0.8;
        ball.collision_box = new Rect(-2, -2, 4, 4);
        ball.collision_radius = Math.sqrt(4 + 4);
        ball.position = Vector2.from_angle(Math.random() * Math.PI * 2, planet.radius + 10 + 200);
        return ball;
    }


}