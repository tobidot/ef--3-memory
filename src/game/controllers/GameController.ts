import {
    ControllerRouteResponse,
    ControllerRouteResponseType
} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { BaseController } from "./BaseController";

export class GameController extends BaseController {
    public readonly COLOR_COUNT: number = 50;

    /**
     * Start a new game
     */
    public new_game(): ControllerRouteResponse {
        const response: ControllerRouteResponseType = {
            view: this.views.main,
            controller: this.controllers.for_event.game_controller,
        };
        return response;
    }
}