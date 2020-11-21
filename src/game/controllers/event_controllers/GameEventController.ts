import { EventControllerInterface } from "../../../tools/abstract/mvc/Controller";
import { ControllerRouteResponse } from "../../../tools/abstract/mvc/ControllerRouteResponse";
import { FieldModel } from "../../models/FieldModel";
import { BaseController } from "../BaseController";

export class GameEventController extends BaseController implements EventControllerInterface {
    public type: "X" | "O" = "X";

    public mouse_pressed(event: MouseEvent, cx: number, cy: number): ControllerRouteResponse {
        const x = (cx - 200) / 400;
        const y = (cy - 100) / 400;
        if (x < 0 || x >= 1 || y < 0 || y >= 1) return null;
        if (this.models.game.relative_set(x, y, this.type)) {
            this.type = this.type === "X" ? "O" : "X";
        }
        const winner = this.models.game.get_winner();
        if (winner !== false) {
            this.models.game.reset();
            return {
                view: this.views.info.text.set([
                    'Game Is Over',
                    'Player ' + winner + ' has won!'
                ]),
                controller: this.controllers.for_event.info_controller,
            }
        }
        return this.views.main.fields.set(this.models.game.get_fields_as_string());
    }

    public update(dt: number): ControllerRouteResponse {
        this.models.game.update(dt);
        return null;
    }
}