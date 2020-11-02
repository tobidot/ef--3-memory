import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import { ObservableSocket } from "@game.object/ts-game-toolbox/dist/src/signals/ObservableSocket";
import { GameState } from "./helper/GameState";
import { PlayerModel } from "./PlayerModel";
import { WordModel } from "./WordModel";

export class GameModel extends Model {
    public player: PlayerModel = new PlayerModel;
    public word: WordModel = new WordModel;
    public info_screen_in_x_seconds: number | false = false;
    public state: GameState = GameState.INTRODUCTION;

    public update(delta_seconds: number) {
        this.word.update(delta_seconds);
        if (this.info_screen_in_x_seconds !== false) {
            this.info_screen_in_x_seconds -= delta_seconds;
        }
    }

    public guess(character: string) {
        this.player.add_guess(character);
        if (!this.word.has_character(character)) {
            this.player.loose_live();
        }
    }

    public reset() {
        this.player.reset();
        this.word.generate_random_word();
    }
}