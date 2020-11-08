import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import { ObservableSocket } from "@game.object/ts-game-toolbox/dist/src/signals/ObservableSocket";
import { Game } from "../base/Game";
import { GameState } from "./helper/GameState";
import { PlayerModel } from "./PlayerModel";
import { WordModel } from "./WordModel";

export class GameModel extends Model {
    public player: PlayerModel = new PlayerModel;
    public word: WordModel = new WordModel;
    public info_screen_in_x_seconds: number | false = false;
    public state: GameState = GameState.INTRODUCTION;
    public lost_at_timestamp: number = 0;
    public won_at_timestamp: number = 0;

    public update(delta_seconds: number) {
        this.word.update(delta_seconds);
        if (this.info_screen_in_x_seconds !== false) {
            this.info_screen_in_x_seconds -= delta_seconds;
        }
    }

    public guess(character: string) {
        if (this.player.has_already_guessed(character)) return;
        this.player.add_guess(character);
        if (!this.word.has_character(character)) {
            this.player.loose_live();
            if (this.player.has_lost()) {
                this.lost_at_timestamp = Game.ingame_time_in_seconds;
            }
        } else {
            if (this.word.is_complete(this.player.guessed_characters)) {
                this.won_at_timestamp = Game.ingame_time_in_seconds;
            }
        }
    }

    public reset() {
        this.player.reset();
        this.word.generate_random_word();
    }
}