import { EventControllerInterface } from "../../../tools/abstract/mvc/Controller";
import { ControllerRouteResponse } from "../../../tools/abstract/mvc/ControllerRouteResponse";
import { FieldModel } from "../../models/FieldModel";
import { BaseController } from "../BaseController";

export class GameEventController extends BaseController implements EventControllerInterface {

    public mouse_pressed(event: MouseEvent, cx: number, cy: number): ControllerRouteResponse {
        const x = (cx - 200) / 400;
        const y = (cy - 100) / 400;
        const pos = this.models.game.convert_relative_position_to_field_position(x, y);
        if (pos === false) return null;
        this.models.game.active_player_pick_position(...pos);
        const winner = this.models.game.get_winner();
        if (winner !== false) return this.game_won(winner);
        return this.views.main.fields.set(this.models.game.get_fields_as_string());
    }

    public game_won(winner: "X" | "O"): ControllerRouteResponse {
        this.models.game.reset();
        return {
            view: this.views.info.text.set([
                'Game Is Over',
                'Player ' + winner + ' has won!'
            ]),
            controller: this.controllers.for_event.info_controller,
        }
    }

    public update(dt: number): ControllerRouteResponse {
        this.models.game.update(dt);
        return null;
    }
}