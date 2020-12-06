import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { Rect } from "../../tools/data/Rect";
import { ModelCollection } from "./ModelCollection";
import { PhysicsModelAdapter } from "./model_adapters/PhysicsModelAdapter";
import { PlanetModel } from "./PlanetModel";
import { ObjectModel } from "./ObjectModel";

export class GamePhysicsModel extends Model<ModelCollection> {
    public readonly GRAVITY_CONSTANT = 800000;
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
            return player;
        });
    }

    public update_gravity_acceleration(delta_seconds: number) {
        this.models.objects.map((player: ObjectModel) => {
            this.models.planets.map((planet: PlanetModel) => {
                const diff = planet.position.cpy().sub(player.position);
                const distance2 = diff.cpy().len2();
                const acceleration = this.GRAVITY_CONSTANT * planet.gravity / distance2;
                player.velocity.x += diff.x * acceleration * delta_seconds;
                player.velocity.y += diff.y * acceleration * delta_seconds;
                return planet;
            });
            return player;
        });
    }

    public resolve(delta_seconds: number) {
        this.resolve_planet_collisions(delta_seconds);
    }

    public resolve_planet_collisions(delta_seconds: number) {
        this.models.objects.map((player) => {
            this.models.planets.map((planet: PlanetModel) => {
                const diff = planet.position.cpy().sub(player.position);
                const distance2 = diff.cpy().len2();
                if (distance2 < (planet.radius + 5) * (planet.radius + 5)) {
                    const offset = diff.cpy().set_magnitude(planet.radius + 5).mul(-1);
                    const orthogonal_counterforce = diff.dot(player.velocity) / diff.len2();
                    player.position.set(planet.position.cpy().add(offset));
                    player.velocity.add(diff.mul(-1).mul(orthogonal_counterforce));
                    player.velocity.mul(Math.min(1, Math.max(0.5, 1 - orthogonal_counterforce)));
                    player.is_grounded = true;
                }
                return planet;
            });
            return player;
        });
    }
}