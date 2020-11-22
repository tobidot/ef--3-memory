import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { BaseController } from "../BaseController";

export class InfoScreenEventController extends BaseController implements EventControllerInterface {

    public key_pressed(event: KeyboardEvent): ControllerRouteResponse {
        if (event.key === "Enter") {
            return null;
        }
        return null;
    }

    public update(dt: number): ControllerRouteResponse {
        this.models.game.update(dt);
        return null;
    }
}