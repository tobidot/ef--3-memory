import {
    ControllerRouteResponse,
    ControllerRouteResponseType
} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import {BaseController} from "./BaseController";
import {RgbColor} from "@game.object/ts-game-toolbox/dist/src/data/RgbColor";

export class GameController extends BaseController {

    public new_game(): ControllerRouteResponse {
        for (let i = 0; i < 50; ++i) {
            let star = this.models.stars.insert_new();
            const intensity = Math.random() * 100 + 155;
            star.color = new RgbColor(
                Math.max(intensity + 50 * Math.random(), 255),
                Math.max(intensity + 50 * Math.random(), 255),
                Math.max(intensity + 50 * Math.random(), 255),
            );
            star.z = Math.random() * 100;
            star.position.set({
                x: Math.random() * 400 * 2 - 400,
                y: Math.random() * 300 * 2 - 300,
            });
        }
        const response: ControllerRouteResponseType = {
            view: this.views.main,
            controller: this.controllers.for_event.game_controller,
        };
        return response;
    }
}