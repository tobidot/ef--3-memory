import { ModelCollectionBase } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Collections";
import { ModelTable } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ModelTable";
import { CameraModel } from "./CameraModel";
import { GameModel } from "./GameModel";
import { GamePhysicsModel } from "./GamePhysicsModel";
import { PlanetModel } from "./PlanetModel";
import { ObjectModel } from "./ObjectModel";


export interface ModelCollection extends ModelCollectionBase {
    camera: CameraModel,
    game: GameModel,
    physics: GamePhysicsModel,
    planets: ModelTable<ModelCollection, PlanetModel>,
    objects: ModelTable<ModelCollection, ObjectModel>,
}

export function create_models(): ModelCollection {
    const collection: ModelCollection = {} as ModelCollection;
    return Object.assign(collection, {
        game: new GameModel(collection),
        physics: new GamePhysicsModel(collection),
        camera: new CameraModel(collection),
        planets: new ModelTable(collection, PlanetModel),
        objects: new ModelTable(collection, ObjectModel),
    });
}