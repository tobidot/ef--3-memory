
import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse, ControllerRouteResponseType } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { PlanetModel } from "../models/PlanetModel";
import { ObjectModel } from "../models/ObjectModel";
import { BaseController } from "./BaseController";
import {ImageModel} from "../models/ImageModel";

export class GameController extends BaseController implements EventControllerInterface {

    public new_game(): ControllerRouteResponse {
        const planet = PlanetModel.create_planet(this.models.planets);
        const moon = PlanetModel.create_moon(this.models.planets);

        ImageModel.create_image(this.models.images, 'green-dot', 'green-dot');
        ImageModel.create_image(this.models.images, 'red-dot', 'red-dot');
        ImageModel.create_image(this.models.images, 'moon', 'moon');
        ImageModel.create_image(this.models.images, 'planet', 'planet');

        ObjectModel.create_player(this.models.objects, planet);
        ObjectModel.create_enemy(this.models.objects, planet);
        ObjectModel.create_ball(this.models.objects, planet);
        ObjectModel.create_ball(this.models.objects, planet);
        ObjectModel.create_ball(this.models.objects, planet);

        const response: ControllerRouteResponseType = {
            view: this.views.info.text.set([
                'This is a fighting game, ',
                'where you have to katapult your enemies to the moon,',
                'in order to defeat them.',
            ]),
            controller: this.controllers.for_event.info_controller,
        };
        return response;
    }

    public main(): ControllerRouteResponse {
        return this.views.main.set_update(() => {

        });
    }

    public update(delta_seconds: number): ControllerRouteResponse {
        return null;
    }


}