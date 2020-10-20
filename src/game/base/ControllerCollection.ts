import { GameController } from "../controllers/GameController";
import { Game } from "./Game";
import { ModelCollection } from "./ModelCollection";
import { ViewCollection } from "./ViewCollection";
import { ViewHandler } from "./ViewHandler";

export class ControllerCollection {
    public game_controller: GameController;

    constructor(models: ModelCollection, views: ViewCollection) {
        this.game_controller = new GameController(models, views);
    }
}