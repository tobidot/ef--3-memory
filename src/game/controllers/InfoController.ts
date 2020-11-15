import { Controller, EventController } from "../../tools/abstract/mvc/Controller";
import { View } from "../../tools/abstract/mvc/View";
import { ControllerRouteResponse } from "../../tools/abstract/mvc/ControllerRouteResponse";
import { ControllerEvent } from "../../tools/abstract/mvc/ControllerEvent";
import { BaseController } from "./BaseController";

export class InputController extends BaseController implements EventController {

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
        this.models.game.update(dt);
        return null;
    }
}