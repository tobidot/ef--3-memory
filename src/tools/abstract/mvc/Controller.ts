import { ControllerEvent } from "./ControllerEvent";
import { ControllerRouteResponse, ControllerRouteResponseType } from "./ControllerRouteResponse";

export class Controller<
    MODEL_COLLECTION,
    VIEW_COLLECTION,
    CONTROLLER_COLLECTION
    > {
    public constructor(
        protected models: MODEL_COLLECTION,
        protected views: VIEW_COLLECTION,
        protected controllers: CONTROLLER_COLLECTION,
    ) {

    }
}

export interface EventController {
    key_pressed?: (key_code: number) => ControllerRouteResponse;
    mouse_pressed?: (x: number, y: number) => ControllerRouteResponse;
    update?: (delta_seconds: number) => ControllerRouteResponse;
    dispatch_event?: (event: ControllerEvent) => ControllerRouteResponse;
}