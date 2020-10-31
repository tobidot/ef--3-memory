import p5 from "p5";
import { tools } from "@game.object/ts-game-toolbox";
import { GameController } from "../controllers/GameController";
import { GameModel } from "../models/GameModel";
import { GameViewManager } from "./GameViewManager";
import { ViewHandler } from "./ViewHandler";
import { ModelCollection } from "./ModelCollection";
import { ControllerCollection } from "./ControllerCollection";
import { Model, View } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import { ViewCollection } from "./ViewCollection";
import { consts } from "../consts/Colors";
import { GameView } from "../../tools/GameView";

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
        this.apply_controller_response(this.controllers.game_controller.new_game());
        p.keyPressed = () => {
            this.controllers.input_controller.key_pressed(p.keyCode);
        };
    }

    public update(delta_ms: number) {
        if (!this.controllers) return;
        this.apply_controller_response(this.controllers.game_controller.update(delta_ms));
    }

    public apply_controller_response(view: GameView | null) {
        if (view) this.view.set_current_view(view);
    }

    public draw() {
        this.view.draw();
    }

}