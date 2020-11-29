import { ModelCollectionBase } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Collections";
import { CameraModel } from "./CameraModel";
import { GameModel } from "./GameModel";
import { GamePhysicsModel } from "./GamePhysicsModel";

export interface ModelCollection extends ModelCollectionBase {
    camera: CameraModel,
    game: GameModel,
}

export function create_models(): ModelCollection {
    return {
        game: new GameModel(),
        camera: new CameraModel(),
    }
}