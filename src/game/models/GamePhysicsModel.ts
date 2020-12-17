import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { Rect } from "../../tools/data/Rect";
import { ModelCollection } from "./ModelCollection";
import { PhysicsModelAdapter } from "./model_adapters/PhysicsModelAdapter";
import { PlanetModel } from "./PlanetModel";
import { ObjectModel } from "./ObjectModel";
import { Vector2, Vector2I } from "../../tools/data/Vector2";
import { Vector } from "p5";
import { PhysicCollisionHelper } from "./helpers/physics/PhysicsCollisionHelper";

export interface PhysicRelation {
    position_difference: Vector2I;
    distance: number;
    distance_squared: number;
    overlapping_vector: Vector2I | null;
}

export class GamePhysicsModel extends Model<ModelCollection> {
    public readonly GRAVITY_CONSTANT = 10000000;
    public players_enclosing_rect: Rect = new Rect();

    public update(delta_seconds: number) {
        this.prepare_update();
        this.update_objects_relations();
        this.update_gravity_acceleration(delta_seconds);
        this.update_position(delta_seconds);
    }


    public prepare_update() {
        const obejcts = this.models.objects.all();
        if (obejcts.length === 0) {
            this.players_enclosing_rect.set(0, 0, 0, 0);
        } else {
            this.players_enclosing_rect.set(obejcts[0].position.x, obejcts[0].position.y, 0, 0);
        }
    }

    public update_position(delta_seconds: number) {
        this.models.objects.map((object: ObjectModel) => {
            object.physics.update(delta_seconds);
            return object;
        });
    }

    public update_objects_relations() {
        this.models.objects.map((player: ObjectModel) => {
            this.players_enclosing_rect.expand_to(player.position);
            player.caching_physics_relation = PhysicCollisionHelper.get_all_relations(player, this.models.objects);
            return player;
        });
    }

    public update_gravity_acceleration(delta_seconds: number) {
        this.models.objects.map((player: ObjectModel) => {
            this.models.planets.map((planet: PlanetModel) => {
                const diff = planet.position.cpy().sub(player.position);
                const distance2 = diff.cpy().len2();
                const distance = Math.sqrt(distance2);
                const acceleration = this.GRAVITY_CONSTANT * planet.gravity / distance2;
                player.velocity.x += diff.x / distance * acceleration * delta_seconds;
                player.velocity.y += diff.y / distance * acceleration * delta_seconds;
                return planet;
            });
            return player;
        });
    }

    public resolve(delta_seconds: number) {
        this.resolve_prepare(delta_seconds);
        this.resolve_object_collisions(delta_seconds);
        this.resolve_planet_collisions(delta_seconds);
    }

    public resolve_prepare(delta_seconds: number) {
        this.models.objects.map((object) => {
            object.is_grounded = false;

            return object;
        });
    }

    public resolve_object_collisions(delta_seconds: number) {
        this.models.objects.map((object) => {
            this.models.objects.map((other_object) => {
                const relation = object.caching_physics_relation.get(other_object);
                if (relation?.overlapping_vector) {
                    const overlap = new Vector2(relation.overlapping_vector);
                    const overlap_distance2 = overlap.len2();
                    const force = overlap
                        // .cross(overlap.get_unsigned())
                        .mul(delta_seconds * 60);
                    object.velocity.add(force);
                    if (overlap_distance2 > object.collision_radius * object.collision_radius / 4) {
                        const overlap_distance = Math.sqrt(overlap_distance2);
                        const force_position_distance = overlap_distance - object.collision_radius / 2;
                        object.position.add(overlap.set_magnitude(force_position_distance));
                    }
                }
                return other_object;
            });
            return object;
        });

    }

    public resolve_planet_collisions(delta_seconds: number) {
        this.models.objects.map((object) => {
            this.models.planets.map((planet: PlanetModel) => {
                const diff = planet.position.cpy().sub(object.position);
                const distance2 = diff.cpy().len2();
                if (distance2 < (planet.radius + 5) * (planet.radius + 5)) {
                    const offset = diff.cpy().set_magnitude(planet.radius + 5).mul(-1);
                    const orthogonal_counterforce = Math.max(0, diff.dot(object.velocity) / diff.len2());
                    object.position.set(planet.position.cpy().add(offset));
                    object.velocity.add(diff.mul(-1).mul(orthogonal_counterforce));
                    object.velocity.mul(Math.min(1, Math.max(0.5, 1 - orthogonal_counterforce)));
                    object.is_grounded = true;
                }
                return planet;
            });
            return object;
        });
    }

    public resolve_collision(a: ObjectModel, b: ObjectModel) {
    }
}