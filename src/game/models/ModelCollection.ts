import { ModelTable } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ModelTable";
import { ModelCollectionBase } from "@game.object/ts-game-toolbox/src/abstract/mvc/Collections";
import { CameraModel } from "./CameraModel";
import { GameModel } from "./GameModel";
import { MemoryCardModel } from "./MemoryCardModel";
import { PlayerModel } from "./PlayerModel";


export interface ModelCollection extends ModelCollectionBase {
    game: GameModel,
    camera: CameraModel,
    players: ModelTable<ModelCollection, PlayerModel>,
    cards: ModelTable<ModelCollection, MemoryCardModel>,
}

export function create_models(): ModelCollection {
    const collection: ModelCollection = {} as ModelCollection;
    return Object.assign(collection, {
        game: new GameModel(collection),
        camera: new CameraModel(collection),
        players: new ModelTable(collection, PlayerModel),
        cards: new ModelTable(collection, MemoryCardModel),
    });
}