import { ModelCollection } from "../base/ModelCollection";
import { ViewCollection } from "../base/ViewCollection";

export class InputController {
    public constructor(protected models: ModelCollection, protected views: ViewCollection) {
    }

    public key_pressed(key_code: number) {
        if (key_code >= 0x40 && key_code <= 0x5A) {
            const letter = String.fromCharCode(key_code).toLowerCase();
            this.models.game.player.add_guess(letter);
        }
    }
}