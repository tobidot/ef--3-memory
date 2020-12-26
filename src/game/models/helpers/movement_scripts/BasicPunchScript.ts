import {Vector2} from "../../../../tools/data/Vector2";
import {PlayerActionScript} from "./PlayerActionScript"
import {ModelCollection} from "../../ModelCollection";
import {ObjectModel} from "../../ObjectModel";
import {DamageInteractionHelper, EffectDefinition} from "../physics/DamageInteractionHelper";

export class BasicPunchScript extends PlayerActionScript {
    protected progress: number = 0;
    protected behaviour: (delta_seconds: number) => void = this.push.bind(this);
    protected force: Vector2 = new Vector2(0, -150);

    constructor(target: ObjectModel, models: ModelCollection) {
        super(target, models);
        this.is_disabling_movement = false;
    }

    public update(delta_seconds: number) {
        this.progress += delta_seconds;
        this.behaviour(delta_seconds);
    }

    public push(delta_seconds: number) {
        const effect_definition:EffectDefinition = {
            base_damage: 25,
            base_force: 15,
            effect_radius: 80,
        };
        DamageInteractionHelper.apply_effects_to_objects_hit(this.target, effect_definition, this.models);
        this.is_finished = true;
    }
}