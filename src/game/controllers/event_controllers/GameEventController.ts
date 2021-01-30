import { BaseController } from "../BaseController";
import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { Rect } from "@game.object/ts-game-toolbox/dist/src/geometries/Rect";
import { MemoryCardModel } from "../../models/MemoryCardModel";
import { CameraModel } from "../../models/CameraModel";
import { tools } from "@game.object/ts-game-toolbox";
import { PromiseController } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/controllers/PromiseController";
import { PickCardResponse, PickCardResponseType } from "../../models/PlayerModel";

export class GameEventController extends BaseController implements EventControllerInterface {

    public update(delta_seconds: number): ControllerRouteResponse {
        return null;
    }

    public mouse_pressed(event: MouseEvent, x: number, y: number): ControllerRouteResponse {
        const camera: CameraModel = this.models.camera;
        let hit: MemoryCardModel | null = this.models.cards.all()
            .reduce((hit: MemoryCardModel | null, next: MemoryCardModel) => {
                const screen_collider = camera.transformRect(new Rect().set(next.collider));
                if (screen_collider.contains({ x, y })) return next;
                return hit;
            }, null);
        if (hit !== null) {
            const player = this.models.game.active_player
            if (!player) {
                throw new Error("Who is my player");
            }
            return player.pick_card(hit)
                // Nothing happens
                // reveal the first card
                .do_on((response, card) => {
                    card.is_revealed = true;
                    player.selected_card = card;
                    return response;
                }, PickCardResponseType.REVEALED_FIRST_CARD)
                // Second Draw
                .do_on((response, card) => {
                    return new PromiseController(() => {
                        card.is_revealed = true;
                        return {
                            controller: this.controllers.delay_controller
                                .trigger_at.set(performance.now() + 1000 * 1),
                        };
                    });
                }, PickCardResponseType.REVEALED_UNFITTING_PAIR,
                    PickCardResponseType.REVEALED_FITTING_PAIR)
                // Bad draw
                .do_on((response, card) => {
                    if (!(response instanceof PromiseController)) return response;
                    return response.finaly(() => {
                        if (!player.selected_card) return response;
                        card.is_revealed = false;
                        player.selected_card.is_revealed = false;
                        player.selected_card = null;
                        this.models.game.next_player();
                        return {
                            view: this.views.main.current_player.set(this.models.game.active_player),
                            controller: this
                        };
                    });
                }, PickCardResponseType.REVEALED_UNFITTING_PAIR)
                // 
                .do_on((response, card) => {
                    if (!(response instanceof PromiseController)) return response;
                    return response.finaly(() => {
                        if (!player.selected_card) return response;
                        player.selected_card.is_drawn = card.is_drawn = true;
                        player.selected_card = null;
                        player.points++;
                        return {
                            controller: this
                        };
                    });
                }, PickCardResponseType.REVEALED_FITTING_PAIR)
                .response;
        }
        return null;
    }

}