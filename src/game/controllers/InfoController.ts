import { Controller } from "../../tools/abstract/mvc/Controller";
import { View } from "../../tools/abstract/mvc/View";
import { models } from "../models/ModelCollection";
import { ControllerRouteResponse } from "../../tools/abstract/mvc/ControllerRouteResponse";
import { ControllerEvent } from "../../tools/abstract/mvc/ControllerEvent";

export class InputController extends Controller {

    public key_pressed(key_code: number): ControllerRouteResponse {
        if (key_code >= 0x40 && key_code <= 0x5A) {

        }
        if (key_code === 0x0D) {

        }
        return null;
    }

    public dispatch_event(event: ControllerEvent): ControllerRouteResponse {
        switch (event.event_name) {
        }
        return null;
    }

    public update(dt: number): View | null {
        models.game.update(dt);
        return null;
    }
}