import {PhysicRelation} from "../../GamePhysicsModel";
import {ObjectModel} from "../../ObjectModel";
import {ModelTable} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ModelTable";
import {ModelCollection} from "../../ModelCollection";
import {Vector2, Vector2I} from "../../../../tools/data/Vector2";
import {GraphicEffectModel} from "../../GraphicEffectModel";

export interface EffectDefinition {
    base_damage: number;
    base_force: number;
    effect_radius: number;
}

export class DamageInteractionHelper {
    public static calculate_force(effect_defintion: EffectDefinition, hit_object: ObjectModel, relation: PhysicRelation): number {
        const damage_mod = (750000 + hit_object.damage * hit_object.damage) / 1750000;
        const distance_mod = Math.min(1, Math.max(0.5, effect_defintion.effect_radius / relation.distance));
        const weight_mod = 1 / hit_object.weight;
        const force = effect_defintion.base_force * damage_mod * distance_mod * weight_mod;
        return force;
    }

    public static calculate_damage(effect_defintion: EffectDefinition, hit_object: ObjectModel, relation: PhysicRelation): number {
        const damage_modifier = 1 - relation.distance / effect_defintion.effect_radius;
        const clamped_modifier = Math.max(1, Math.min(0.5, damage_modifier));
        const damage = effect_defintion.base_damage * clamped_modifier;
        return damage;
    }

    public static apply_effects_to_objects_hit(
        source: ObjectModel,
        effect_definition: EffectDefinition,
        models: ModelCollection,
        force_direction?: Vector2I,
    ) {
        models.objects.map((object) => {
            if (object === source) return object;
            const relation = source.caching_physics_relation.get(object);
            if (!relation) return object;
            if ((relation.distance < effect_definition.effect_radius)) {
                const damage = DamageInteractionHelper.calculate_damage(effect_definition, object, relation);
                object.damage = Math.min(999, object.damage + damage);

                const force = DamageInteractionHelper.calculate_force(effect_definition, object, relation);
                const direction = force_direction
                    ? new Vector2(force_direction).rotate_radians_clockwise(source.rotation)
                    : new Vector2(relation.position_difference).mul(1 / relation.distance);

                object.velocity.set( direction.mul( force ) );
                GraphicEffectModel.create_explosion( models.graphic_effects, object.position.cpy());
            }
            return object;
        });
    }

    public static damage_vector
}