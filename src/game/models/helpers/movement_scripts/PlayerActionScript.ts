import { Vector2 } from "../../../../tools/data/Vector2";
import { PhysicsModelAdapter } from "../../model_adapters/PhysicsModelAdapter";

export class PlayerActionScript {
    protected target: PhysicsModelAdapter;
    public is_interuptable: boolean = false;
    public is_finished: boolean = false;

    public constructor(target: PhysicsModelAdapter) {
        this.target = target;
    }

    public update(delta_seconds: number) {

    }
}