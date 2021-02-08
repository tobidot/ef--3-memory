import { BaseController } from "../BaseController";
import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse, ControllerRouteResponseType } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { MemoryCardModel } from "../../models/MemoryCardModel";
import { PromisableControllerRouteResponseType, PromiseController } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/controllers/PromiseController";
import { PlayerModel, PlayerTurnState } from "../../models/PlayerModel";
import { is_user_interface_event, UserInterfaceEvent } from "../../events/UserInterfaceEvent";
import { UserInterfaceModelAdapter } from "../../models/model-adapters/UserInterfaceModelAdapter";
import { is_memory_card_revealed_event, MemoryCardRevealedEvent } from "../../events/MemoryCardRevealedEvent";
import { assert_never } from "../../../tools/helper";
import { Vector2 } from "@game.object/ts-game-toolbox/dist/src/geometries/Vector2";
import { ControllerEvent } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerEvent";

export class GameEventController extends BaseController implements EventControllerInterface {

    public update(delta_seconds: number): ControllerRouteResponse {
        return null;
    }

    public mouse_pressed(event: MouseEvent, x: number, y: number): ControllerRouteResponse {
        const camera = this.models.camera;
        const target = camera.reverse_transform(new Vector2({ x, y }));
        const memory_card_selected: MemoryCardModel | undefined = this.models.cards.all().filter(
            (card: MemoryCardModel) => UserInterfaceModelAdapter.for(card).is_clicked(target)
        ).shift();
        if (!memory_card_selected) return null;
        const interface_event: UserInterfaceEvent = {
            event_name: "user-interface-event",
            target: memory_card_selected,
            in_game_mouse: target,
            original: event,
        };
        return interface_event;
    }

    public dispatch_event(event: ControllerEvent): ControllerRouteResponse {
        if (is_user_interface_event(event)) {
            if (event.target instanceof MemoryCardModel) {
                return this.memory_card_clicked(event.target);
            }
        } else if (is_memory_card_revealed_event(event)) {
            return this.memory_card_revealed(event.target);
        }
        return null;
    }

    protected memory_card_clicked(card: MemoryCardModel): ControllerRouteResponse {
        if (!card.is_clickable) return null;
        const card_revealed_event: MemoryCardRevealedEvent = {
            event_name: "memory-card-revealed-event",
            target: card,
        };
        return card_revealed_event;
    }

    protected memory_card_revealed(card: MemoryCardModel): ControllerRouteResponse {
        const player = this.models.game.active_player;
        if (!player) {
            throw new Error("Who is my player");
        }
        player.select_card(card);
        const state = player.get_state_of_turn();
        // no card selected ??
        if (state === PlayerTurnState.TURN_STARTED) {
            throw new Error("Controller should not be called in this state");;
        }
        // first card selected, wait for the second card
        if (state === PlayerTurnState.REVEALED_FIRST_CARD) return null;
        // revealed second card, next players turn
        if (state === PlayerTurnState.REVEALED_SECOND_CARD) {
            return new PromiseController(() => {
                return this.player_pick_second_card_wait(player);
            }).finaly(() => {
                return this.player_pick_second_card_resume(player)
            });
        }
        return assert_never(state);
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