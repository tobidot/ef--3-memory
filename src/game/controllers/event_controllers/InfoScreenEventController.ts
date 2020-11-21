import { EventControllerInterface } from "../../../tools/abstract/mvc/Controller";
import { ControllerRouteResponse } from "../../../tools/abstract/mvc/ControllerRouteResponse";
import { BaseController } from "../BaseController";

export class InfoScreenEventController extends BaseController implements EventControllerInterface {

    public key_pressed(event: KeyboardEvent): ControllerRouteResponse {
        if (event.key === "Enter") {
            return {
                view: this.views.main.fields.set(this.models.game.get_fields_as_string()),
                controller: this.controllers.for_event.game_controller,
            };
        }
        return null;
    }

    public update(dt: number): ControllerRouteResponse {
        this.models.game.update(dt);
        return null;
    }
}