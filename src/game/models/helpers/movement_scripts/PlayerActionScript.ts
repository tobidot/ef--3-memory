import { PhysicsModelAdapter } from "../../model_adapters/PhysicsModelAdapter";

export class PlayerActionScript {
    protected target: PhysicsModelAdapter;
    public is_interuptable_by_action: boolean = false;
    public is_interuptable_by_movement = false;
    public is_disabling_movement = true;
    public is_finished: boolean = false;

    public constructor(target: PhysicsModelAdapter) {
        this.target = target;
    }

    public update(delta_seconds: number) {

    }
}