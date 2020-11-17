
import { Controller, EventControllerInterface } from "../../tools/abstract/mvc/Controller";
import { ControllerRouteResponse, ControllerRouteResponseType } from "../../tools/abstract/mvc/ControllerRouteResponse";
import { ModelCollection } from "../models/ModelCollection";
import { ViewCollection } from "../views/ViewCollection";
import { ControllerCollection } from "./ControllerCollection";

export class GameController extends Controller<ModelCollection, ViewCollection, ControllerCollection> implements EventControllerInterface {

    public new_game(): ControllerRouteResponse {
        this.models.game.reset();
        const response: ControllerRouteResponseType = {
            view: this.views.info.text.set([
                'Tic Tac Toe',
                '',
                'In this game you play on a small Grid',
                'and try to create a straight line of your symbols.',
            ]),
            controller: this.controllers.for_event.info_controller,
        };
        return response;
    }

    public main(): ControllerRouteResponse {
        return this.views.main.set_update(() => {

        });
    }

    public update(delta_seconds: number): ControllerRouteResponse {
        return null;
    }
}