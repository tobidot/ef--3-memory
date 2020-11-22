import { BaseController } from "../BaseController";
import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";


export class GameEventController extends BaseController implements EventControllerInterface {

    public mouse_pressed(event: MouseEvent, cx: number, cy: number): ControllerRouteResponse {
        return null;
    }

    public update(dt: number): ControllerRouteResponse {
        this.models.game.update(dt);
        return null;
    }
}