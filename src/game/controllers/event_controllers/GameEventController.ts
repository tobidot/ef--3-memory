import { BaseController } from "../BaseController";
import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { Rect } from "@game.object/ts-game-toolbox/dist/src/geometries/Rect";
import { MemoryCardModel } from "../../models/MemoryCardModel";
import { CameraModel } from "../../models/CameraModel";
import { tools } from "@game.object/ts-game-toolbox";
import { PromisableControllerRouteResponseType, PromiseController } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/controllers/PromiseController";
import { PickCardResponse, PickCardResponseState, PlayerModel, PlayerTurnState } from "../../models/PlayerModel";
import { ControllerRouteResponseType } from "@game.object/ts-game-toolbox/src/abstract/mvc/ControllerRouteResponse";

export class GameEventController extends BaseController implements EventControllerInterface {

    public update(delta_seconds: number): ControllerRouteResponse {
        return null;
    }

    public mouse_pressed(event: MouseEvent, x: number, y: number): ControllerRouteResponse {
        const memory_card_selected: MemoryCardModel | null = this.models.cards.all()
            .reduce((hit: MemoryCardModel | null, next: MemoryCardModel) => {
                if (next.is_hit({ x, y }) && !next.is_revealed) return next;
                return hit;
            }, null);
        if (!memory_card_selected) return null;
        const player = this.models.game.active_player;
        if (!player) {
            throw new Error("Who is my player");
        }
        player.select_card(memory_card_selected);
        const state = player.get_state_of_turn();
        if (state === PlayerTurnState.TURN_STARTED) throw new Error("Controller should not be called in this state");;
        if (state === PlayerTurnState.REVEALED_FIRST_CARD) return null;
        return new PromiseController(() => {
            return this.player_pick_second_card_wait(player);
        }).finaly(() => {
            return this.player_pick_second_card_resume(player)
        });
    }

    protected player_pick_second_card_wait(player: PlayerModel): PromisableControllerRouteResponseType {
        return {
            controller: this.controllers.delay_controller
                .trigger_at.set(performance.now() + 1000 * 1),
        };
    }

    protected player_pick_second_card_resume(player: PlayerModel): ControllerRouteResponseType {
        if (player.has_pair_revealed()) {
            player.collect_cards();
            return {
                controller: this
            };
        } else {
            player.drop_cards();
            this.models.game.next_player();
            return {
                view: this.views.main.current_player.set(this.models.game.active_player),
                controller: this
            };
        }
    }

}