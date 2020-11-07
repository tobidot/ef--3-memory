import { Controller } from "./Controller";
import { ControllerEvent } from "./ControllerEvent";
import { View } from "./View";

export type ControllerRouteResponse = null | View | Controller | ControllerEvent | ControllerRouteResponseType;

export interface ControllerRouteResponseType {
    view?: View | null;
    controller?: Controller | null;
    events?: Array<ControllerEvent>;
}