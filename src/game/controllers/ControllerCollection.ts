import { ModelCollection } from "../models/ModelCollection";
import { ViewCollection } from "../views/ViewCollection";
import { GameController } from "./GameController";
import { InputController as InfoController } from "./InfoController";

export interface ControllerCollection {
    game_controller: GameController,
    info_controller: InfoController,
}

export function create_controllers(models: ModelCollection, views: ViewCollection): ControllerCollection {
    const controllers: ControllerCollection = {} as ControllerCollection;
    const buffer: ControllerCollection = {
        game_controller: new GameController(models, views, controllers),
        info_controller: new InfoController(models, views, controllers),
    };
    return Object.assign(controllers, buffer);
}