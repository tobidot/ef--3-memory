import { ControllerCollectionBase } from "../../tools/abstract/mvc/Collections";
import { ModelCollection } from "../models/ModelCollection";
import { ViewCollection } from "../views/ViewCollection";
import { GameController } from "./GameController";
import { InfoScreenEventController } from "./event_controllers/InfoScreenEventController";

export interface ControllerCollection extends ControllerCollectionBase {
    game_controller: GameController,
    for_event: {
        info_controller: InfoScreenEventController,
    }
}

export function create_controllers(models: ModelCollection, views: ViewCollection): ControllerCollection {
    const controllers: ControllerCollection = {} as ControllerCollection;
    const buffer: ControllerCollection = {
        game_controller: new GameController(models, views, controllers),
        for_event: {
            info_controller: new InfoScreenEventController(models, views, controllers),
        }
    };
    return Object.assign(controllers, buffer);
}