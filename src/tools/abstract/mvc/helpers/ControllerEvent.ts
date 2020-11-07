import { Game } from "../../../../game/base/Game";
import { ControllerEvent } from "../ControllerEvent";

export function event(event: string | ControllerEvent): ControllerEventConstructor {
    return new ControllerEventConstructor(event);
}

export class ControllerEventConstructor implements ControllerEvent {
    public event_name: string;
    public fire_at?: number;

    constructor(public event: string | ControllerEvent) {
        if (typeof event === "string") {
            this.event_name = event;
        } else {
            this.event_name = event.event_name;
            Object.assign(this, event);
        }
    }

    public after_x_seconds(seconds: number): this {
        this.fire_at = Game.ingame_time_in_seconds + seconds;
        return this;
    }

    public set_data(data: any) {
        Object.assign(this, data);
        return this;
    }
}