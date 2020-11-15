import { ControllerCollection, ModelCollection, ViewCollection } from "./Collections";
import { ControllerEvent } from "./ControllerEvent";
import { ControllerRouteResponse, ControllerRouteResponseType } from "./ControllerRouteResponse";

export interface ControllerInterface {

}
export class Controller<
    MODEL_COLLECTION extends ModelCollection,
    VIEW_COLLECTION extends ViewCollection,
    CONTROLLER_COLLECTION extends ControllerCollection
    > implements ControllerInterface {
    public constructor(
        protected models: MODEL_COLLECTION,
        protected views: VIEW_COLLECTION,
        protected controllers: CONTROLLER_COLLECTION,
    ) {

    }
}

export function is_controller_interface(controller: any): controller is ControllerInterface {
    return controller instanceof Controller;
}
export interface EventControllerInterface {
    key_pressed?: (key_code: number) => ControllerRouteResponse;
    mouse_pressed?: (x: number, y: number) => ControllerRouteResponse;
    update?: (delta_seconds: number) => ControllerRouteResponse;
    dispatch_event?: (event: ControllerEvent) => ControllerRouteResponse;
}

export function is_event_controller_interface(controller: any): controller is EventControllerInterface {
    return controller instanceof Controller;
}