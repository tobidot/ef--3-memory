import {
    ControllerRouteResponse,
    ControllerRouteResponseType
} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { RgbColor } from "@game.object/ts-game-toolbox/src/data/RgbColor";
import { BaseController } from "./BaseController";

export class GameController extends BaseController {
    public readonly COLOR_COUNT: number = 50;

    /**
     * Start a new game
     */
    public new_game(): ControllerRouteResponse {
        let last_color: RgbColor | null = null;
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                let card = this.models.cards.insert_new();
                card.position.set(x * 80, y * 80);
                card.is_revealed = false;

                if (last_color === null) {
                    card.color = last_color = this.get_random_color();
                } else {
                    card.color = last_color;
                    last_color = null;
                }
            }
        }
        const response: ControllerRouteResponseType = {
            view: this.views.main.memory_cards.set(this.models.cards.all()),
            controller: this.controllers.for_event.game_controller,
        };
        return response;
    }

    private get_random_color(): RgbColor {
        return [
            new RgbColor(1.0, 1.0, 1.0),
            new RgbColor(1.0, 0.0, 1.0),
            new RgbColor(1.0, 1.0, 0.0),
            new RgbColor(0.2, 1.2, 1.0),
            new RgbColor(0.2, 0.2, 1.0),
            new RgbColor(0.2, 1.0, 0.0),
        ][Math.trunc(Math.random() * 6)];
    }
}