
import { Controller } from "../../tools/abstract/mvc/Controller";
import { ControllerRouteResponse, ControllerRouteResponseType } from "../../tools/abstract/mvc/ControllerRouteResponse";
import { View } from "../../tools/abstract/mvc/View";
import { models } from "../models/ModelCollection";
import { views } from "../views/ViewCollection";
import { controllers } from "./ControllerCollection";

export class GameController extends Controller {

    public guess_character(character: string): View | null {
        models.game.player.add_guess(character);
        return null;
    }

    public new_game(): ControllerRouteResponse {
        models.game.reset();
        const response: ControllerRouteResponseType = {
            view: views.info.text.set([
                'In this game you have to guess a word i came up with.',
                'You do this by guessing the letters of the word.',
                'If you think a certain letter is in my word,',
                'simply press that key and i will check.',
                'If the letter is used in my word, i will reveal all occurences of it.',
                'If it does not however, you will loose a live.',
                'You win if all letters of my word are revealed.',
                'You loose if you have lost 5 lives.',
            ]),
            controller: controllers.input_controller
        };
        return response;
    }

    public main(): View | null {
        return views.main.set_update(() => {
            const letters = models.game.word.reveal_characters(models.game.player.guessed_characters);
            views.main.set_letters(letters);
            views.main.death_progress = models.game.player.get_lives_as_fraction();
        });
    }

}