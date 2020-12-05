import { Vector2 } from "../../../../tools/data/Vector2";
import { PhysicsModelAdapter } from "../../model_adapters/PhysicsModelAdapter";
import { PlayerActionScript } from "./PlayerActionScript"
import { StepDirectionScript } from "./StepDirectionScript";

export class StepRightScript extends StepDirectionScript {
    constructor(target: PhysicsModelAdapter) {
        super(target, Vector2.RIGHT.cpy().mul(50));
    }

}