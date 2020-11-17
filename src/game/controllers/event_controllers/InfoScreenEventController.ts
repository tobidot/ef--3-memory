import { EventControllerInterface } from "../../../tools/abstract/mvc/Controller";
import { ControllerRouteResponse } from "../../../tools/abstract/mvc/ControllerRouteResponse";
import { BaseController } from "../BaseController";

export class InfoScreenEventController extends BaseController implements EventControllerInterface {

    public key_pressed(event: KeyboardEvent): ControllerRouteResponse {
        if (event.key === "Enter") {
            return this.views.info.text.set([
                'Start again',
            ]);
        }
        return null;
    }

    public update(dt: number): ControllerRouteResponse {
        this.models.game.update(dt);
        return null;
    }
}