import { BaseController } from "../BaseController";
import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { Vector2 } from "../../../tools/data/Vector2";


export class GameEventController extends BaseController implements EventControllerInterface {
    public is_arrow_down_pressed: boolean = false;
    public is_arrow_up_pressed: boolean = false;
    public is_arrow_left_pressed: boolean = false;
    public is_arrow_right_pressed: boolean = false;

    public mouse_pressed(event: MouseEvent, cx: number, cy: number): ControllerRouteResponse {
        return null;
    }

    public key_down(event: KeyboardEvent): ControllerRouteResponse {
        switch (event.key) {
            case "ArrowLeft":
                this.is_arrow_left_pressed = true;
                break;
            case "ArrowRight":
                this.is_arrow_right_pressed = true;
                break;
            case "ArrowUp":
                this.is_arrow_up_pressed = true;
                break;
            case "ArrowDown":
                this.is_arrow_down_pressed = true;
                break;
        }

        return null;
    }

    public key_up(event: KeyboardEvent): ControllerRouteResponse {
        switch (event.key) {
            case "ArrowLeft":
                this.is_arrow_left_pressed = false;
                break;
            case "ArrowRight":
                this.is_arrow_right_pressed = false;
                break;
            case "ArrowUp":
                this.is_arrow_up_pressed = false;
                break;
            case "ArrowDown":
                this.is_arrow_down_pressed = false;
                break;
        }
        return null;
    }

    public update(delta_seconds: number): ControllerRouteResponse {
        this.update_inputs(delta_seconds);

        this.models.game.update(delta_seconds);
        this.models.camera.update(this.models.game.physics, delta_seconds);

        this.views.main.planets.set([
            this.models.game.planet,
            this.models.game.moon,
        ]).players.set(
            this.models.game.players
        ).camera.set({
            area: this.models.camera.area,
        });
        return null;
    }

    public update_inputs(delta_seconds: number) {
        if (this.is_arrow_left_pressed) {
            this.models.game.players[0].self_accelerate(Vector2.LEFT, delta_seconds);
        }
        if (this.is_arrow_right_pressed) {
            this.models.game.players[0].self_accelerate(Vector2.RIGHT, delta_seconds);
        }
        if (this.is_arrow_up_pressed) {
            this.models.game.players[0].self_accelerate(Vector2.UP, delta_seconds);
        }
        if (this.is_arrow_down_pressed) {
            this.models.game.players[0].self_accelerate(Vector2.DOWN, delta_seconds);
        }
    }
}