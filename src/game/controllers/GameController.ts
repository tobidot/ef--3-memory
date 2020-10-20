
import { ModelCollection } from "../base/ModelCollection";
import { ViewCollection } from "../base/ViewCollection";

export class GameController {
    public constructor(protected models: ModelCollection, protected views: ViewCollection) {
    }

    public guess_character(character: string) {
        this.models.player.add_guess(character);
        return this.views.main.set_color(consts.colors.BLUE);
    }

    public update(dt: number) {

    }
}