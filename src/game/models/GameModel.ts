import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { ObservableSocket } from "@game.object/ts-game-toolbox/dist/src/signals/ObservableSocket";
import { UserInput } from "./helpers/ActionTypes";
import { ModelCollection } from "./ModelCollection";
import { ObjectModel } from "./ObjectModel";
import { PlanetModel } from "./PlanetModel";

export class GameModel extends Model<ModelCollection> {

    public update(delta_seconds: number) {
        this.models.physics.update(delta_seconds);
        this.update_objects(delta_seconds);
        this.rotate_objects_to_planet();
        this.models.physics.resolve(delta_seconds);
    }

    public update_objects(delta_seconds: number) {
        this.models.objects.map((object) => {
            object.update(delta_seconds);
            return object;
        });
    }

    public rotate_objects_to_planet() {
        const center = this.models.planets.all()[0].position;
        this.models.objects.map((object: ObjectModel) => {
            object.physics.rotate_to_center(center);
            return object;
        })
    }

    public input_player(action: UserInput) {
        this.models.objects.map((player: ObjectModel) => {
            if (!player.is_user_controlled) return player;
            player.controllable.handle_input(action);
            return player;
        });
    }
}