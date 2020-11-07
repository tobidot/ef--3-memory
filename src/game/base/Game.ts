import p5 from "p5";
import { controllers } from "../controllers/ControllerCollection";
import { View } from "../../tools/abstract/mvc/View";
import { Controller, EventController } from "../../tools/abstract/mvc/Controller";
import { ControllerRouteResponse } from "../../tools/abstract/mvc/ControllerRouteResponse";
import { views } from "../views/ViewCollection";
import { ControllerEvent, is_controller_event } from "../../tools/abstract/mvc/ControllerEvent";

export class Game {
    public static p: p5;
    public static controllers = controllers;
    public static views = views;
    public static ingame_time_in_seconds: number = 0;

    public active_view: View | null = null;
    public active_controller: EventController | null = null;
    public event_queue: Array<ControllerEvent> = [];

    constructor(p: p5) {
        Game.p = p;
        this.apply_controller_response(controllers.game_controller.new_game());
        p.keyPressed = () => {
            if (!this.active_controller) return;
            if (!this.active_controller.key_pressed) return;
            this.apply_controller_response(this.active_controller.key_pressed(p.keyCode));
        };
    }

    public update(delta_seconds: number) {
        Game.ingame_time_in_seconds += delta_seconds;
        if (!this.active_controller) return;
        if (!this.active_controller.update) return;
        this.apply_controller_response(this.active_controller.update(delta_seconds));
        this.handle_events();
    }

    public handle_events() {
        let event_queue_buffer = [...this.event_queue];
        this.event_queue = [];
        event_queue_buffer = event_queue_buffer.filter((event) => {
            if (event.fire_at && event.fire_at >= Game.ingame_time_in_seconds) return true;
            if (!this.active_controller) return false;
            if (!this.active_controller.dispatch_event) return false;
            this.apply_controller_response(this.active_controller.dispatch_event(event));
            return false;
        });
        this.event_queue = [...event_queue_buffer, ...this.event_queue];
    }

    public apply_controller_response(response: ControllerRouteResponse) {
        if (response === null) return;
        if (response instanceof View) return this.set_active_view(response);
        if (response instanceof Controller) return this.set_active_controller(response);
        if (is_controller_event(response)) return this.event_queue.push(response);
        if (response.view !== undefined) {
            this.set_active_view(response.view);
        }
        if (response.controller !== undefined) {
            this.set_active_controller(response.controller);
        }
        if (response.events !== undefined) {
            this.event_queue.push(...response.events);
        }
    }

    public set_active_controller(controller: Controller | null) {
        this.active_controller = controller;
    }

    public set_active_view(view: View | null) {
        this.active_view = view;
    }

    public draw() {
        if (!this.active_view) return;
        if (this.active_view.update) {
            this.active_view.update();
        }
        this.active_view.draw();
    }

}