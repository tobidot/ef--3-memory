import { Game } from "../base/Game";
import { GameModel } from "./GameModel";

export interface ModelCollection {
    game: GameModel,
}

export function create_models(game: Game): ModelCollection {
    return {
        game: new GameModel,
    }
}