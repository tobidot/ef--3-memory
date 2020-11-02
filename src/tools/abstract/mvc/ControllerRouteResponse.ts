import { Controller } from "./Controller";
import { View } from "./View";

export type ControllerRouteResponse = null | View | Controller | ControllerRouteResponseType;

export interface ControllerRouteResponseType {
    view?: View | null;
    conotroller?: Controller | null;
}