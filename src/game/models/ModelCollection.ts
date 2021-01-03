import { ModelCollectionBase } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Collections";
import { GameModel } from "./GameModel";
import {ModelTable} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ModelTable";
import {StarModel} from "./StarModel";


export interface ModelCollection extends ModelCollectionBase {
    game: GameModel,
    stars: ModelTable<ModelCollection, StarModel>,
}

export function create_models(): ModelCollection {
    const collection: ModelCollection = {} as ModelCollection;
    return Object.assign(collection, {
        game: new GameModel(collection),
        stars: new ModelTable(collection, StarModel),
    });
}