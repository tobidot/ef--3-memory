import { PhysicsModelAdapter } from "../../model_adapters/PhysicsModelAdapter";
import {ModelCollection} from "../../ModelCollection";
import {ObjectModel} from "../../ObjectModel";

export class PlayerActionScript {
    protected target: ObjectModel;
    protected models: ModelCollection;
    public is_interuptable_by_action: boolean = false;
    public is_interuptable_by_movement = false;
    public is_disabling_movement = true;
    public is_finished: boolean = false;

    public constructor(target: ObjectModel, models: ModelCollection) {
        this.target = target;
        this.models = models;
    }

    public update(delta_seconds: number) {

    }
}