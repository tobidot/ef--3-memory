import { ControllerEvent } from "./ControllerEvent";
import { ControllerRouteResponse, ControllerRouteResponseType } from "./ControllerRouteResponse";

export class Controller implements EventController {

}

export interface EventController {
    key_pressed?: (key_code: number) => ControllerRouteResponse;
    mouse_pressed?: (x: number, y: number) => ControllerRouteResponse;
    update?: (delta_seconds: number) => ControllerRouteResponse;
    dispatch_event?: (event: ControllerEvent) => ControllerRouteResponse;
}