import { ControllerRouteResponse } from "@game.object/ts-game-toolbox/src/abstract/mvc/ControllerRouteResponse";
import { Model } from "@game.object/ts-game-toolbox/src/abstract/mvc/Model";
import { assert_never } from "../../tools/helper";
import { MemoryCardModel } from "./MemoryCardModel";
import { ModelCollection } from "./ModelCollection";

export type PickCardResponseCallback = (previous: ControllerRouteResponse, picked_card: MemoryCardModel) => ControllerRouteResponse;
export enum PickCardResponseType {
    INVALID_MOVE,
    REVEALED_FIRST_CARD,
    REVEALED_FITTING_PAIR,
    REVEALED_UNFITTING_PAIR,
};
export class PickCardResponse {
    public response: ControllerRouteResponse = {};
    public constructor(
        private state: PickCardResponseType,
        private picked_card: MemoryCardModel
    ) { }
    public do_on(callback: PickCardResponseCallback, ...events: PickCardResponseType[]): this {
        if (events.includes(this.state)) {
            this.response = callback(this.response, this.picked_card);
        }
        return this;
    };
}

/**
 * Model representing the player state
 */
export class PlayerModel extends Model<ModelCollection> {
    private static next_id = 1;
    public id: number = PlayerModel.next_id++;
    //
    public selected_card: MemoryCardModel | null = null;
    public points: number = 0;
    // 
    /**
     * 
     * @param card 
     *  the card the player has selected
     * @return PickCardResponse
     *  returns the possible outcomes
     */
    public pick_card(card: MemoryCardModel): PickCardResponse {
        if (card.is_drawn) return new PickCardResponse(PickCardResponseType.INVALID_MOVE, card);
        if (!this.selected_card) {
            return new PickCardResponse(PickCardResponseType.REVEALED_FIRST_CARD, card);
        } else {
            if (this.selected_card === card) return new PickCardResponse(PickCardResponseType.INVALID_MOVE, card);
            if (this.selected_card.color === card.color) {
                return new PickCardResponse(PickCardResponseType.REVEALED_FITTING_PAIR, card);
            } else {
                return new PickCardResponse(PickCardResponseType.REVEALED_UNFITTING_PAIR, card);
            }
        }
    }

}