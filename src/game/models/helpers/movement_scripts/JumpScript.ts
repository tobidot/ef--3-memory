import { Vector2 } from "../../../../tools/data/Vector2";
import { PhysicsModelAdapter } from "../../model_adapters/PhysicsModelAdapter";
import { PlayerActionScript } from "./PlayerActionScript"
import {ObjectModel} from "../../ObjectModel";
import {ModelCollection} from "../../ModelCollection";

export class JumpScript extends PlayerActionScript {
    protected progress: number = 0;
    protected behaviour: (delta_seconds: number) => void = this.jump.bind(this);
    protected force: Vector2 = new Vector2(0, -250);

    constructor(target: ObjectModel, models: ModelCollection) {
        super(target, models);
        this.is_disabling_movement = false;
        this.target.physics.local_accelerate(this.force);
    }

    public update(delta_seconds: number) {
        this.progress += delta_seconds;
        this.behaviour(delta_seconds);
    }

    public jump(delta_seconds: number) {
        this.progress += delta_seconds;
        if (this.progress > 0.25) {
            this.behaviour = this.stop.bind(this);
        }
    }

    public stop(delta_seconds: number) {
        // this.target.object.velocity.mul(Math.pow(0.5, delta_seconds * 60));
        this.is_finished = true;

    }
}