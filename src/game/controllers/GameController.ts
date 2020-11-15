
import { Controller } from "../../tools/abstract/mvc/Controller";
import { ControllerRouteResponse, ControllerRouteResponseType } from "../../tools/abstract/mvc/ControllerRouteResponse";
import { View } from "../../tools/abstract/mvc/View";
import { views } from "../views/ViewCollection";
import { controllers } from "./ControllerCollection";

export class GameController extends Controller {

    public new_game(): ControllerRouteResponse {
        models.game.reset();
        const response: ControllerRouteResponseType = {
            view: views.info.text.set([]),
            controller: this,
        };
        return response;
    }

    public main(): View | null {
        return views.main.set_update(() => {

        });
    }

}