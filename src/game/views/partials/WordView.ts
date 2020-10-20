import { View } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import { FunctionalView } from "../../../tools/FunctionalView";
import { WordModel } from "../../models/WordModel";

interface WordViewInput {
    characters: Array<string>;
}

class WordView extends FunctionalView<WordModel> {
    draw(): void {

    }
}