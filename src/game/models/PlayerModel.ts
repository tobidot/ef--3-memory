import { ControllerRouteResponse } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { BranchingResponse } from "../../tools/BranchingResponse";
import { MemoryCardModel } from "./MemoryCardModel";
import { ModelCollection } from "./ModelCollection";

export enum PlayerTurnState {
    TURN_STARTED,
    REVEALED_FIRST_CARD,
    REVEALED_SECOND_CARD,
};

export enum PickCardResponseState {
    INVALID_MOVE,
    REVEALED_FIRST_CARD,
    REVEALED_FITTING_PAIR,
    REVEALED_UNFITTING_PAIR,
};
export class PickCardResponse extends
    BranchingResponse<
    ControllerRouteResponse,
    PickCardResponseState,
    MemoryCardModel
    > {

}

/**
 * Model representing the player state
 */
export class PlayerModel extends Model<ModelCollection> {
    private static next_id = 1;
    public id: number = PlayerModel.next_id++;
    //
    public selected_card: MemoryCardModel | null = null;
    public second_selected_card: MemoryCardModel | null = null;
    public points: number = 0;
    // 

    public select_card(card: MemoryCardModel): boolean {
        card.is_revealed = true;
        if (!this.selected_card) {
            this.selected_card = card;
            return true;
        }
        if (this.selected_card === card) return false;
        if (!this.second_selected_card) {
            this.second_selected_card = card;
            return true;
        }
        throw new Error("Cannot select more than 2 Cards");
    }

    public get_state_of_turn(): PlayerTurnState {
        if (!this.selected_card) return PlayerTurnState.TURN_STARTED;
        if (!this.second_selected_card) return PlayerTurnState.REVEALED_FIRST_CARD;
        return PlayerTurnState.REVEALED_SECOND_CARD;
    }

    public has_pair_revealed(): boolean {
        if (!this.selected_card || !this.second_selected_card) return false;
        return this.selected_card.is_pair(this.second_selected_card);
    }

    public collect_cards() {
        if (this.selected_card) this.selected_card.is_drawn = true;
        if (this.second_selected_card) this.second_selected_card.is_drawn = true;
        this.selected_card = null;
        this.second_selected_card = null;
        this.points++;
    }

    public drop_cards() {
        if (this.selected_card) this.selected_card.is_revealed = false;
        if (this.second_selected_card) this.second_selected_card.is_revealed = false;
        this.selected_card = null;
        this.second_selected_card = null;
    }
}