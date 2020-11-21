import { ControllerCollection, create_controllers } from "../controllers/ControllerCollection";
import { create_views, ViewCollection } from "../views/ViewCollection";
import { create_models, ModelCollection } from "../models/ModelCollection";
import { ControllerRouteResponse } from "../../tools/abstract/mvc/ControllerRouteResponse";
import { MvcCanvasGame } from "../../tools/abstract/mvc/MvcCanvasGame";

export class Game extends MvcCanvasGame<ModelCollection, ViewCollection, ControllerCollection> {

    public update(delta_seconds: number) {
        super.update(delta_seconds);
    }

    protected start(): ControllerRouteResponse {
        return this.controllers.game_controller.new_game();
    }

    protected create_models(): ModelCollection {
        return create_models();
    }

    protected create_views(canvas: HTMLCanvasElement): ViewCollection {
        return create_views(canvas);
    }

    protected create_controllers(models: ModelCollection, views: ViewCollection): ControllerCollection {
        return create_controllers(models, views);
    }
}