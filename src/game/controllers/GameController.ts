
import { GameView } from "../../tools/GameView";
import { ModelCollection } from "../base/ModelCollection";
import { ViewCollection } from "../base/ViewCollection";

export class GameController {
    public constructor(protected models: ModelCollection, protected views: ViewCollection) {
    }

    public guess_character(character: string): GameView | null {
        this.models.game.player.add_guess(character);
        return null;
    }

    public new_game(): GameView | null {
        this.models.game.reset();
        return this.views.info.text.set([
            'In this game you have to guess a word i came up with.',
            'You do this by guessing the letters of the word.',
            'If you think a certain letter is in my word,',
            'simply press that key and i will check.',
            'If the letter is used in my word, i will reveal all occurences of it.',
            'If it does not however, you will loose a live.',
            'You win if all letters of my word are revealed.',
            'You loose if you have lost 5 lives.',
        ]);
    }

    public main(): GameView | null {
        return this.views.main.set_update(() => {
            const letters = this.models.game.word.reveal_characters(this.models.game.player.guessed_characters);
            this.views.main.set_letters(letters);
            this.views.main.death_progress = this.models.game.player.get_lives_as_fraction();
        });
    }

    public update(dt: number): GameView | null {
        this.models.game.update(dt)
        if (this.models.game.info_screen_in_x_seconds < 0) {
            return this.views.info.text.set(['You lost']);
        }
        return null;
    }
}