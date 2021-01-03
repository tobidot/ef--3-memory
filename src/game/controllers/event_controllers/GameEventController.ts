import {BaseController} from "../BaseController";
import {EventControllerInterface} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import {ControllerRouteResponse} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";

export class GameEventController extends BaseController implements EventControllerInterface {

    public update(delta_seconds: number): ControllerRouteResponse {
        this.models.game.update(delta_seconds);
        this.views.main.stars.set(this.models.stars.all());
        return null;
    }

}