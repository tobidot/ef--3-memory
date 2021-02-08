import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { ModelCollection } from "./ModelCollection";
import { PlayerModel } from "./PlayerModel";

export class GameModel extends Model<ModelCollection> {
    public max_player_id = 0;
    public active_player: PlayerModel | null = null;

    public next_player() {
        if (this.active_player === null) return;
        if (this.active_player.id >= this.models.game.max_player_id) {
            this.active_player = this.models.players.all()[0];
        } else {
            this.active_player = this.models.players.where('id', this.active_player.id + 1)[0];
        }
    }
}