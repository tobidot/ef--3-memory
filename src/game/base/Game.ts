import p5 from "p5";
import { tools } from "@game.object/ts-game-toolbox";
import { GameController } from "./GameController";
import { GameModel } from "./GameModel";
import { GameViewManager } from "./GameViewManager";

export class TemplateGame extends tools.abstract.Game<GameModel, GameViewManager, GameController> {
    public preload() {

    }

    public init(p: p5) {
        this.view_manager = new GameViewManager(p);
        this.model = new GameModel();
        this.controller = new GameController(this.model, this.view_manager);
    }
}