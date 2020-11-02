import p5 from "p5";
import { controllers } from "../controllers/ControllerCollection";
import { View } from "../../tools/abstract/mvc/View";
import { Controller, EventController } from "../../tools/abstract/mvc/Controller";
import { ControllerRouteResponse } from "../../tools/abstract/mvc/ControllerRouteResponse";
import { views } from "../views/ViewCollection";

export class Game {
    public active_view: View | null = null;
    public active_controller: EventController | null = null;

    constructor(p: p5) {
        this.apply_controller_response(controllers.game_controller.new_game());
        p.keyPressed = () => {
            if (!this.active_controller) return;
            if (!this.active_controller.key_pressed) return;
            this.apply_controller_response(this.active_controller.key_pressed(p.keyCode));
        };
        debugger;
        views.info.p.set(p);
        views.main.p.set(p);
        views.partials.hanged_man.p.set(p);
        views.partials.word.p.set(p);
    }

    public update(delta_ms: number) {
        if (!this.active_controller) return;
        if (!this.active_controller.update) return;
        this.apply_controller_response(this.active_controller.update(delta_ms));
    }

    public apply_controller_response(response: ControllerRouteResponse) {
        if (response === null) return;
        if (response instanceof View) return this.set_active_view(response);
        if (response instanceof Controller) return this.set_active_controller(response);
        if (response.view !== undefined) this.set_active_view(response.view);
        if (response.conotroller !== undefined) this.set_active_controller(response.conotroller);
    }

    public set_active_controller(controller: Controller | null) {
        this.active_controller = controller;
    }

    public set_active_view(view: View | null) {
        this.active_view = view;
    }

    public draw() {
        if (this.active_view) this.active_view.draw();
    }

}