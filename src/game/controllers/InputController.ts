import { Controller } from "../../tools/abstract/mvc/Controller";
import { View } from "../../tools/abstract/mvc/View";
import { models } from "../models/ModelCollection";
import { views } from "../views/ViewCollection";
import { GameState } from "../models/helper/GameState";
import { ControllerRouteResponse } from "../../tools/abstract/mvc/ControllerRouteResponse";
import { Game } from "../base/Game";
import { event } from "../../tools/abstract/mvc/helpers/ControllerEvent";

export class InputController extends Controller {

    public key_pressed(key_code: number): ControllerRouteResponse {
        if (key_code >= 0x40 && key_code <= 0x5A) {
            const letter = String.fromCharCode(key_code).toLowerCase();
            models.game.guess(letter);
            if (models.game.player.has_lost()) {
                return event("loose").after_x_seconds(2);
            }
        }
        if (key_code === 0x0D) {
            if (models.game.state === GameState.INTRODUCTION) {
                models.game.state = GameState.MAIN;
                return Game.controllers.game_controller.main();
            }
        }
        return null;
    }

    public dispatch_event(event): ControllerRouteResponse {
        switch (event.event_name) {
            case "loose": return views.info.text.set(['You lost']);
        }
        return null;
    }

    public update(dt: number): View | null {
        models.game.update(dt);
        return null;
    }
}