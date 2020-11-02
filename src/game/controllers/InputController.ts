import { Controller } from "../../tools/abstract/mvc/Controller";
import { View } from "../../tools/abstract/mvc/View";
import { models } from "../models/ModelCollection";
import { views } from "../views/ViewCollection";
import { GameState } from "../models/helper/GameState";

export class InputController extends Controller {

    public key_pressed(key_code: number): View | null {
        if (key_code >= 0x40 && key_code <= 0x5A) {
            const letter = String.fromCharCode(key_code).toLowerCase();
            models.game.guess(letter);
            if (models.game.player.has_lost()) {
                models.game.info_screen_in_x_seconds = 2;
            }
        }
        if (key_code === 0x0D) {
            if (models.game.state === GameState.INTRODUCTION) {
                models.game.state = GameState.MAIN;
                return this.main();
            }
        }
        return null;
    }

    public main(): View | null {
        return views.main.set_update(() => {
            const letters = models.game.word.reveal_characters(models.game.player.guessed_characters);
            views.main.set_letters(letters);
            views.main.death_progress = models.game.player.get_lives_as_fraction();
        });
    }

    public update(dt: number): View | null {
        models.game.update(dt)
        if (models.game.info_screen_in_x_seconds < 0) {
            return views.info.text.set(['You lost']);
        }
        return null;
    }
}