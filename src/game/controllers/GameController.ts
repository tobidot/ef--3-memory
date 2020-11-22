
import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse, ControllerRouteResponseType } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { BaseController } from "./BaseController";

export class GameController extends BaseController implements EventControllerInterface {

    public new_game(): ControllerRouteResponse {
        this.models.game.reset();
        const response: ControllerRouteResponseType = {
            view: this.views.info.text.set([
                'Tic Tac Toe',
                '',
                'In this game you play on a small Grid',
                'and try to create a straight line of your symbols.',
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