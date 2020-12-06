
import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse, ControllerRouteResponseType } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { PlanetModel } from "../models/PlanetModel";
import { PlayerModel } from "../models/PlayerModel";
import { BaseController } from "./BaseController";

export class GameController extends BaseController implements EventControllerInterface {

    public new_game(): ControllerRouteResponse {
        this.models.game.reset();
        this.models.objects = [
            new PlayerModel(),
            new PlayerModel(),
        ];
        this.models.planets = [
            new PlanetModel(),
            new PlanetModel(),
        ];
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