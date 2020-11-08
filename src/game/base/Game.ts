import p5 from "p5";
import { controllers } from "../controllers/ControllerCollection";
import { View } from "../../tools/abstract/mvc/View";
import { Controller, EventController } from "../../tools/abstract/mvc/Controller";
import { ControllerRouteResponse } from "../../tools/abstract/mvc/ControllerRouteResponse";
import { views } from "../views/ViewCollection";
import { ControllerEvent, is_controller_event } from "../../tools/abstract/mvc/ControllerEvent";
import { MVCGame } from "../../tools/abstract/mvc/MVCgame";

export class Game extends MVCGame {
    public static p: p5;
    public static controllers = controllers;
    public static views = views;
    public static ingame_time_in_seconds: number = 0;

    constructor(p: p5) {
        super();
        Game.p = p;
        this.apply_controller_response(controllers.game_controller.new_game());
        p.keyPressed = () => {
            if (!this.active_controller) return;
            if (!this.active_controller.key_pressed) return;
            this.apply_controller_response(this.active_controller.key_pressed(p.keyCode));
        };
    }

    public update(delta_seconds: number) {
        Game.ingame_time_in_seconds += delta_seconds;
        super.update(delta_seconds);
    }
}