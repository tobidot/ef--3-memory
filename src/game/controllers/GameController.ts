import {
    ControllerRouteResponse,
    ControllerRouteResponseType
} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { RgbColor } from "@game.object/ts-game-toolbox/src/data/RgbColor";
import { BaseController } from "./BaseController";

export class GameController extends BaseController {

    public colord_gradients = 3;

    public all_colors = (() => {
        let step = Math.trunc(0xdf / this.colord_gradients) + 0x20;
        let buffer: Array<RgbColor> = [];
        for (let r = 0x20; r <= 0xff; r += step) {
            for (let g = 0x20; g <= 0xff; g += step) {
                for (let b = 0x20; b <= 0xff; b += step) {
                    if (r === b && b === g) continue;
                    buffer.push(new RgbColor(
                        r, g, b
                    ));
                }
            }
        }
        return buffer;
    })();

    /**
     * Start a new game
     */
    public new_game(): ControllerRouteResponse {
        /// create Cards
        let last_color: RgbColor | null = null;
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                let card = this.models.cards.insert_new();
                card.collider.set(x * 100 + 10, y * 100 + 10, 80, 80);
                card.is_revealed = false;

                if (last_color === null) {
                    card.color = last_color = this.get_random_color();
                } else {
                    card.color = last_color;
                    last_color = null;
                }
            }
        }
        /// Shuffle positions
        const all_cards = this.models.cards.all();
        for (let i = 0; i < 25 * 2; ++i) {
            const card_a = all_cards[Math.trunc(all_cards.length * Math.random())];
            const card_b = all_cards[Math.trunc(all_cards.length * Math.random())];
            // swap the colors
            [card_a.color, card_b.color] = [card_b.color, card_a.color];
        }
        /// response
        this.models.camera.center.set(400 - 100 * 2.5, 300 - 100 * 2.5);
        const response: ControllerRouteResponseType = {
            view: this.views.main
                .memory_cards.set(this.models.cards.all())
                .camera.set(this.models.camera),
            controller: this.controllers.for_event.game_controller,
        };
        return response;
    }

    public get_random_color(): RgbColor {
        return this.all_colors[Math.trunc(Math.random() * this.all_colors.length)];
    }


}