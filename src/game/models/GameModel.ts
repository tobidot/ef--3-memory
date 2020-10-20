import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import { ObservableSocket } from "@game.object/ts-game-toolbox/dist/src/signals/ObservableSocket";
import { PlayerModel } from "./PlayerModel";
import { WordModel } from "./WordModel";

export class GameModel extends Model {
    public player: PlayerModel = new PlayerModel;
    public word: WordModel = new WordModel;

    public update(delta_ms: number) {
        this.word.update(delta_ms);
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