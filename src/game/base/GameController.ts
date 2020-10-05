import { tools } from "@game.object/ts-game-toolbox";
import p5 from "p5";
import { GameModel } from "./GameModel";
import { GameViewManager } from "./GameViewManager";

export class GameController extends tools.abstract.Controller<GameModel, GameViewManager> {
    public constructor(public model: GameModel, public view_manager: GameViewManager) {
        super(model, view_manager);
    }

    public draw() {
        this.view_manager.draw();
    }

    public update(dt: number) {
        this.model.update(dt);
    }
}