import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { BaseController } from "../BaseController";

export class InfoScreenEventController extends BaseController implements EventControllerInterface {

    public key_pressed(event: KeyboardEvent): ControllerRouteResponse {
        if (event.key === "Enter") {
            return {
                controller: this.controllers.for_event.game_controller,
                view: this.views.main,
            };
        }
        return null;
    }

    public update(delta_seconds: number): ControllerRouteResponse {
        return null;
    }
}