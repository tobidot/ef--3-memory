import { ModelCollectionBase } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Collections";
import { CameraModel } from "./CameraModel";
import { GameModel } from "./GameModel";
import { GamePhysicsModel } from "./GamePhysicsModel";
import { PlanetModel } from "./PlanetModel";
import { PlayerModel } from "./PlayerModel";

export interface ModelCollection extends ModelCollectionBase {
    camera: CameraModel,
    game: GameModel,
    physics: GamePhysicsModel,
    planets: Array<PlanetModel>,
    objects: Array<PlayerModel>,
}

export function create_models(): ModelCollection {
    return {
        game: new GameModel,
        physics: new GamePhysicsModel,
        camera: new CameraModel,
        planets: [],
        objects: [],
    }
}