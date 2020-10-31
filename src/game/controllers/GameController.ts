
import { View } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import { GameView } from "../../tools/GameView";
import { ModelCollection } from "../base/ModelCollection";
import { ViewCollection } from "../base/ViewCollection";
import { consts } from "../consts/Colors";

export class GameController {
    public constructor(protected models: ModelCollection, protected views: ViewCollection) {
    }

    public guess_character(character: string): GameView | null {
        this.models.game.player.add_guess(character);
        return null;
    }

    public new_game(): GameView | null {
        this.models.game.reset();
        return this.main();
    }

    public main(): GameView | null {
        return this.views.main.set_update(() => {
            const letters = this.models.game.word.reveal_characters(this.models.game.player.guessed_characters);
            this.views.main.set_letters(letters);
        });
    }

    public update(dt: number): GameView | null {
        return null;
    }
}