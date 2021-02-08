import { ControllerEvent } from "@game.object/ts-game-toolbox/src/abstract/mvc/events/ControllerEvent";
import { Model } from "@game.object/ts-game-toolbox/src/abstract/mvc/models/Model";
import { Vector2I } from "@game.object/ts-game-toolbox/src/geometries/Vector2";
import { UserInterfaceAdaptable } from "../models/model-adapters/UserInterfaceModelAdapter";
import { ModelCollection } from "../models/ModelCollection";

export interface UserInterfaceEvent extends ControllerEvent {
    event_name: "user-interface-event";
    target: Model<ModelCollection> & UserInterfaceAdaptable;
    original: MouseEvent;
    in_game_mouse: Vector2I;
}

export function is_user_interface_event(obj: any): obj is UserInterfaceEvent {
    return ("event_name" in obj) && obj.event_name === "user-interface-event";
}