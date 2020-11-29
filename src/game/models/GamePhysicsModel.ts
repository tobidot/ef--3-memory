import { Rect } from "../../tools/data/Rect";
import { PlanetModel } from "./PlanetModel";
import { PlayerModel } from "./PlayerModel";

export class GamePhysicsModel {
    public players_enclosing_rect: Rect = new Rect();

    public update(planets: Array<PlanetModel>, players: Array<PlayerModel>) {
        this.prepare_update(planets, players);
        this.update_player_to_player_relations(players);
    }

    public prepare_update(planets: Array<PlanetModel>, players: Array<PlayerModel>) {
        if (players.length === 0) {
            this.players_enclosing_rect.set(0, 0, 0, 0);
        } else {
            this.players_enclosing_rect.set(players[0].position.x, players[0].position.y, 0, 0);
        }
    }

    public update_player_to_player_relations(players: Array<PlayerModel>) {
        players.forEach((player) => {
            this.players_enclosing_rect.expand_to(player.position);
        });
    }
}