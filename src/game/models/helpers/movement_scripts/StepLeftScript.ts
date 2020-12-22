import {Vector2} from "../../../../tools/data/Vector2";
import {PhysicsModelAdapter} from "../../model_adapters/PhysicsModelAdapter";
import {StepDirectionScript} from "./StepDirectionScript";
import {ModelCollection} from "../../ModelCollection";
import {ObjectModel} from "../../ObjectModel";

export class StepLeftScript extends StepDirectionScript {
    constructor(target: ObjectModel, models: ModelCollection) {
        super(target, models, Vector2.LEFT.cpy().mul(50));
    }
}