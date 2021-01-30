import { ModelCollectionBase } from "@game.object/ts-game-toolbox/src/abstract/mvc/Collections";
import { ModelTable } from "@game.object/ts-game-toolbox/src/abstract/mvc/ModelTable";
import { CameraModel } from "./CameraModel";
import { GameModel } from "./GameModel";
import { MemoryCardModel } from "./MemoryCardModel";


export interface ModelCollection extends ModelCollectionBase {
    game: GameModel,
    camera: CameraModel,
    cards: ModelTable<ModelCollection, MemoryCardModel>,
}

export function create_models(): ModelCollection {
    const collection: ModelCollection = {} as ModelCollection;
    return Object.assign(collection, {
        game: new GameModel(collection),
        camera: new CameraModel(collection),
        cards: new ModelTable(collection, MemoryCardModel),
    });
}