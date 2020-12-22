import {Vector2} from "../../../../tools/data/Vector2";
import {StepDirectionScript} from "./StepDirectionScript";
import {ObjectModel} from "../../ObjectModel";
import {ModelCollection} from "../../ModelCollection";

export class StepRightScript extends StepDirectionScript {
    constructor(target: ObjectModel, models: ModelCollection) {
        super(target, models, Vector2.RIGHT.cpy().mul(50));
    }

}