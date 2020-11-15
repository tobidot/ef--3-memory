import { ModelCollectionBase } from "../../tools/abstract/mvc/Collections";
import { Game } from "../base/Game";
import { GameModel } from "./GameModel";

export interface ModelCollection extends ModelCollectionBase {
    game: GameModel,
}

export function create_models(game: Game): ModelCollection {
    return {
        game: new GameModel(),
    }
}