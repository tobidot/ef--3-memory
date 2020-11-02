import { GameView } from "../../tools/GameView";
import { ModelCollection } from "../base/ModelCollection";
import { ViewCollection } from "../base/ViewCollection";
import { GameState } from "../models/helper/GameState";

export class InputController {
    public constructor(protected models: ModelCollection, protected views: ViewCollection) {
    }

    public key_pressed(key_code: number): GameView | null {
        if (key_code >= 0x40 && key_code <= 0x5A) {
            const letter = String.fromCharCode(key_code).toLowerCase();
            this.models.game.guess(letter);
            if (this.models.game.player.has_lost()) {
                this.models.game.info_screen_in_x_seconds = 2;
            }
        }
        if (key_code === 0x0D) {
            if (this.models.game.state === GameState.INTRODUCTION) {
                this.models.game.state = GameState.MAIN;
                return this.main();
            }
        }
        return null;
    }

    public main(): GameView | null {
        return this.views.main.set_update(() => {
            const letters = this.models.game.word.reveal_characters(this.models.game.player.guessed_characters);
            this.views.main.set_letters(letters);
            this.views.main.death_progress = this.models.game.player.get_lives_as_fraction();
        });
    }
}