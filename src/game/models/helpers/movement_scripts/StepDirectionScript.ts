import { Vector2 } from "../../../../tools/data/Vector2";
import { PhysicsModelAdapter } from "../../model_adapters/PhysicsModelAdapter";
import { PlayerActionScript } from "./PlayerActionScript"

export class StepDirectionScript extends PlayerActionScript {
    protected progress: number = 0;
    protected behaviour: (delta_seconds: number) => void = this.move.bind(this);
    protected velocity: Vector2;

    constructor(target: PhysicsModelAdapter, velocity: Vector2) {
        super(target);
        this.velocity = velocity;
    }

    public update(delta_seconds: number) {
        this.progress += delta_seconds;
        this.behaviour(delta_seconds);
    }

    public move(delta_seconds: number) {
        this.progress += delta_seconds;
        this.target.set_local_velocity(this.velocity);
        if (this.progress > 1) {
            this.behaviour = this.stop.bind(this);
        }
    }

    public stop(delta_seconds: number) {
        this.target.object.velocity.mul(Math.pow(0.5, delta_seconds * 60));
        if (this.progress > 0.5) {
            this.is_finished = true;
        }

    }


}