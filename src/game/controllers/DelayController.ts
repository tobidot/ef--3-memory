import { ControllerRouteResponseType } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { PromisableController } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/controllers/PromiseController";
import { ChainProperty } from "@game.object/ts-game-toolbox/dist/src/signals/ChainProperty";
import { Controller, EventControllerInterface } from "@game.object/ts-game-toolbox/src/abstract/mvc/Controller";
import { BaseController } from "./BaseController";
import { ControllerCollection } from "./ControllerCollection";

export class DelayController extends BaseController implements PromisableController, EventControllerInterface {
    public next: (() => ControllerRouteResponseType) | null = null;

    public trigger_at = new ChainProperty<this, number>(this, 0);

    public update() {
        if (performance.now() > this.trigger_at.get()) {
            if (this.next) return this.next();
        }
        return null;
    }

    public mouse_pressed(event: MouseEvent) {
        if (this.next) return this.next();
        return null;
    }
}