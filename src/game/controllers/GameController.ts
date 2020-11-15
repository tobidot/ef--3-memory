
import { Controller } from "../../tools/abstract/mvc/Controller";
import { ControllerRouteResponse, ControllerRouteResponseType } from "../../tools/abstract/mvc/ControllerRouteResponse";
import { View } from "../../tools/abstract/mvc/View";
import { ModelCollection } from "../models/ModelCollection";
import { ViewCollection } from "../views/ViewCollection";
import { ControllerCollection } from "./ControllerCollection";

export class GameController extends Controller<ModelCollection, ViewCollection, ControllerCollection> {

    public new_game(): ControllerRouteResponse {
        this.models.game.reset();
        const response: ControllerRouteResponseType = {
            view: this.views.info.text.set([]),
            controller: this,
        };
        return response;
    }

    public main(): ControllerRouteResponse {
        return this.views.main.set_update(() => {

        });
    }

}