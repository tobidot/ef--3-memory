import { ModelCollectionBase } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Collections";
import { GameModel } from "./GameModel";

export interface ModelCollection extends ModelCollectionBase {
    game: GameModel,
}

export function create_models(): ModelCollection {
    return {
        game: new GameModel(),
    }
}