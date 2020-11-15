import { controllers } from "../controllers/ControllerCollection";
import { View } from "../../tools/abstract/mvc/View";
import { Controller, EventController } from "../../tools/abstract/mvc/Controller";
import { ControllerRouteResponse } from "../../tools/abstract/mvc/ControllerRouteResponse";
import { create_views, views } from "../views/ViewCollection";
import { ControllerEvent, is_controller_event } from "../../tools/abstract/mvc/ControllerEvent";
import { MVCGame } from "../../tools/abstract/mvc/MVCgame";
import { GameGlobal } from "./GameGlobal";
import { create_models } from "../models/ModelCollection";

export class Game extends MVCGame {
    public references: GameGlobal = {
        ingame_time_in_seconds: 0,
        models: create_models(this),
        controllers: create_controllers(this),
        views: create_views(this),
    }

    constructor() {
        super();
        this.apply_controller_response(controllers.game_controller.new_game());
    }

    public update(delta_seconds: number) {
        this.references.ingame_time_in_seconds += delta_seconds;
        super.update(delta_seconds);
    }
}