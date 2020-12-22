import { Vector2 } from "../../../../tools/data/Vector2";
import { PhysicsModelAdapter } from "../../model_adapters/PhysicsModelAdapter";
import { PlayerActionScript } from "./PlayerActionScript"
import {ObjectModel} from "../../ObjectModel";
import {ModelCollection} from "../../ModelCollection";

export class StepDirectionScript extends PlayerActionScript {
    protected progress: number = 0;
    protected behaviour: (delta_seconds: number) => void = this.move.bind(this);
    protected wanted_velocity: Vector2;

    constructor(target: ObjectModel, models: ModelCollection, velocity: Vector2) {
        super(target, models);
        this.wanted_velocity = velocity;
        this.is_disabling_movement = false;
        this.is_interuptable_by_movement = true;
    }

    public update(delta_seconds: number) {
        this.progress += delta_seconds;
        this.behaviour(delta_seconds);
    }

    public move(delta_seconds: number) {
        this.progress += delta_seconds;
        const new_velocity = this.wanted_velocity;
        this.target.physics.set_local_velocity(new_velocity);
        if (this.progress > 1) {
            this.behaviour = this.stop.bind(this);
        }
    }

    public stop(delta_seconds: number) {
        this.target.velocity.mul(Math.pow(0.5, delta_seconds * 60));
        if (this.progress > 0.5) {
            this.is_finished = true;
        }

    }


}