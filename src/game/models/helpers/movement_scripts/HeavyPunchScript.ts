import {Vector2} from "../../../../tools/data/Vector2";
import {PlayerActionScript} from "./PlayerActionScript"
import {ModelCollection} from "../../ModelCollection";
import {ObjectModel} from "../../ObjectModel";

export class HeavyPunchScript extends PlayerActionScript {
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
        // this.target.object.velocity.mul(Math.pow(0.5, delta_seconds * 60));
        const effect_radius = this.target.collision_radius + 25;
        this.models.objects.map((object) => {
            if (object === this.target) return object;
            const relation = this.target.caching_physics_relation.get(object);
            if (!relation) return object;
            if ((relation.distance < object.collision_radius + effect_radius)) {
                object.weight = Math.min(object.weight, object.weight * 0.75 + 0.05);
                object.velocity.set(
                    new Vector2(relation.position_difference).mul(200 / relation.distance).mul(1 / object.weight)
                );
            }
            return object;
        });
        this.is_finished = true;
    }
}