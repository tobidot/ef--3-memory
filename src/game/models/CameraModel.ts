import {Model} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import {Rect} from "../../tools/data/Rect";
import {GamePhysicsModel} from "./GamePhysicsModel";
import {ModelCollection} from "./ModelCollection";

export class CameraModel extends Model<ModelCollection> {
    public area: Rect = new Rect(0, 0, 800, 600);
    public target: Rect = new Rect(0, 0, 800, 600);

    public update(physics_model: GamePhysicsModel, delta_seconds: number) {
        const max_distance = this.models.planets.all().reduce((distance: number, planet) => {
            if (planet.radial_distance > distance) return planet.radial_distance;
            return distance;
        }, 0);
        const area_size = max_distance * 0.75;
        this.area.set(-area_size, -area_size, area_size * 2, area_size * 2);
        // this.target = physics_model.players_enclosing_rect;
        // this.area.lerp(this.target, delta_seconds * 2);
    }

}