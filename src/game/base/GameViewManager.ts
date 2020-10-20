import { ViewManager } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import p5 from "p5";
import { MainView } from "../views/main/MainView";
import { GameModel } from "../models/GameModel";

export class GameViewManager extends ViewManager {

    constructor(public p: p5) {
        super(p);
    }

    public main_view(model: GameModel) {
        return new MainView(this.p);
    }

}