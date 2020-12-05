import { Vector2 } from "../../../../tools/data/Vector2";
import { PhysicsModelAdapter } from "../../model_adapters/PhysicsModelAdapter";
import { PlayerActionScript } from "./PlayerActionScript"

export class JumpScript extends PlayerActionScript {
    protected progress: number = 0;
    protected behaviour: (delta_seconds: number) => void = this.jump.bind(this);
    protected force: Vector2 = new Vector2(0, -150);

    constructor(target: PhysicsModelAdapter) {
        super(target);
    }

    public update(delta_seconds: number) {
        this.progress += delta_seconds;
        this.behaviour(delta_seconds);
    }

    public jump(delta_seconds: number) {
        this.progress += delta_seconds;
        this.target.set_local_velocity(this.force);
        if (this.progress > 1) {
            this.behaviour = this.stop.bind(this);
        }
    }

    public stop(delta_seconds: number) {
        // this.target.object.velocity.mul(Math.pow(0.5, delta_seconds * 60));
        if (this.progress > 0.5) {
            this.is_finished = true;
        }

    }
}