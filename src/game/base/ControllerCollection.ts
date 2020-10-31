import { GameController } from "../controllers/GameController";
import { InputController } from "../controllers/InputController";
import { Game } from "./Game";
import { ModelCollection } from "./ModelCollection";
import { ViewCollection } from "./ViewCollection";
import { ViewHandler } from "./ViewHandler";

export class ControllerCollection {
    public game_controller: GameController;
    public input_controller: InputController;

    constructor(models: ModelCollection, views: ViewCollection) {
        this.game_controller = new GameController(models, views);
        this.input_controller = new InputController(models, views);
    }
}