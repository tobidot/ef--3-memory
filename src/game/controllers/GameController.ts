import {
    ControllerRouteResponse,
    ControllerRouteResponseType
} from "@game.object/ts-game-toolbox/src/abstract/mvc/controllers/ControllerRouteResponse";
import { RgbColor } from "@game.object/ts-game-toolbox/src/data/RgbColor";
import { PlayerModel } from "../models/PlayerModel";
import { BaseController } from "./BaseController";

export class GameController extends BaseController {

    public readonly colord_gradients = 3;
    public readonly board_size = 6;
    public readonly board_spacing = 80;
    public readonly card_size = 60;

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
        this.new_players();
        this.new_memory_cards();
        this.shuffle_memory_cards();

        /// response
        this.models.camera.center.set(400 - this.board_spacing * this.board_size / 2, 300 - this.board_spacing * this.board_size / 2);
        const response: ControllerRouteResponseType = {
            view: this.views.main
                .current_player.set(this.models.game.active_player)
                .players.set(this.models.players.all())
                .memory_cards.set(this.models.cards.all())
                .camera.set(this.models.camera),
            controller: this.controllers.for_event.game_controller,
        };
        return response;
    }

    protected new_memory_cards() {
        let last_color: RgbColor | null = null;
        for (let x = 0; x < this.board_size; x++) {
            for (let y = 0; y < this.board_size; y++) {
                let card = this.models.cards.insert_new();
                card.collider.set(x * this.board_spacing + 10, y * this.board_spacing + 10, this.card_size, this.card_size);
                card.is_revealed = false;

                if (last_color === null) {
                    card.color = last_color = this.get_random_color();
                } else {
                    card.color = last_color;
                    last_color = null;
                }
            }
        }
    }

    protected shuffle_memory_cards() {
        const all_cards = this.models.cards.all();
        for (let i = 0; i < 25 * 2; ++i) {
            const card_a = all_cards[Math.trunc(all_cards.length * Math.random())];
            const card_b = all_cards[Math.trunc(all_cards.length * Math.random())];
            // swap the colors
            [card_a.color, card_b.color] = [card_b.color, card_a.color];
        }
    }

    protected new_players() {
        for (let i = 0; i < 2; ++i) {
            this.models.players.insert_new((model: PlayerModel) => {
                model.points = 0;
                model.selected_card = null;
                this.models.game.max_player_id = model.id;
                return model;
            });
        }
        this.models.game.active_player = this.models.players.all()[0];
    }

    public get_random_color(): RgbColor {
        return this.all_colors[Math.trunc(Math.random() * this.all_colors.length)];
    }



}