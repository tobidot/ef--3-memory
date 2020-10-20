import p5 from "p5";
import { tools } from "@game.object/ts-game-toolbox";
import { GameController } from "../controllers/GameController";
import { GameModel } from "../models/GameModel";
import { GameViewManager } from "./GameViewManager";
import { ViewHandler } from "./ViewHandler";
import { ModelCollection } from "./ModelCollection";
import { ControllerCollection } from "./ControllerCollection";
import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import { ViewCollection } from "./ViewCollection";
import { consts } from "../consts/Colors";

export class Game {
    public models: ModelCollection;
    public views: ViewCollection;
    public view: ViewHandler;
    public controllers: ControllerCollection;

    constructor(p: p5) {
        this.models = new ModelCollection;
        this.views = new ViewCollection(p);
        this.view = new ViewHandler;
        this.controllers = new ControllerCollection(this.models, this.views);
        this.view.set_current_view(this.views.main.set_color(consts.Color.GREEN));
    }

    public update(delta_ms: number) {
        if (!this.controllers) return;
        this.controllers.game_controller.update(delta_ms);
    }

    public draw() {
        if (!this.models) return;
        this.view.draw();
    }
}