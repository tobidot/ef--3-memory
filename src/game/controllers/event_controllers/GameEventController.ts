import { BaseController } from "../BaseController";
import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { UserInput } from "../../models/helpers/ActionTypes";


export class GameEventController extends BaseController implements EventControllerInterface {
    public is_arrow_down_pressed: boolean = false;
    public is_arrow_up_pressed: boolean = false;
    public is_arrow_left_pressed: boolean = false;
    public is_arrow_right_pressed: boolean = false;

    public mouse_pressed(event: MouseEvent, cx: number, cy: number): ControllerRouteResponse {
        return null;
    }

    public key_down(event: KeyboardEvent): ControllerRouteResponse {
        if (event.repeat) return null;
        switch (event.key) {
            case "ArrowLeft":
                this.is_arrow_left_pressed = true;
                this.models.game.input_player(UserInput.MOVE_LEFT);
                break;
            case "ArrowRight":
                this.is_arrow_right_pressed = true;
                this.models.game.input_player(UserInput.MOVE_RIGHT);
                break;
            case "ArrowUp":
                this.is_arrow_up_pressed = true;
                this.models.game.input_player(UserInput.MOVE_UP);
                break;
            case "ArrowDown":
                this.is_arrow_down_pressed = true;
                this.models.game.input_player(UserInput.MOVE_DOWN);
                break;
        }

        return null;
    }

    public key_up(event: KeyboardEvent): ControllerRouteResponse {
        if (event.repeat) return null;
        switch (event.key) {
            case "ArrowLeft":
                this.is_arrow_left_pressed = false;
                this.models.game.input_player(UserInput.STOP_MOVE_LEFT);
                break;
            case "ArrowRight":
                this.is_arrow_right_pressed = false;
                this.models.game.input_player(UserInput.STOP_MOVE_RIGHT);
                break;
            case "ArrowUp":
                this.is_arrow_up_pressed = false;
                this.models.game.input_player(UserInput.STOP_MOVE_UP);
                break;
            case "ArrowDown":
                this.is_arrow_down_pressed = false;
                this.models.game.input_player(UserInput.STOP_MOVE_DOWN);
                break;
        }
        return null;
    }

    public update(delta_seconds: number): ControllerRouteResponse {
        this.update_inputs(delta_seconds);

        this.models.game.update(delta_seconds);
        this.models.camera.update(this.models.physics, delta_seconds);

        this.views.main.planets.set(
            this.models.planets.all()
        ).players.set(
            this.models.objects.all()
        ).camera.set({
            area: this.models.camera.area,
        });
        return null;
    }

    public update_inputs(delta_seconds: number) {
        // if (this.is_arrow_left_pressed) {
        //     this.models.game.players[0].ord(Vector2.LEFT, delta_seconds);
        // }
        // if (this.is_arrow_right_pressed) {
        //     this.models.game.players[0].self_accelerate(Vector2.RIGHT, delta_seconds);
        // }
        // if (this.is_arrow_up_pressed) {
        //     this.models.game.players[0].self_accelerate(Vector2.UP, delta_seconds);
        // }
        // if (this.is_arrow_down_pressed) {
        //     this.models.game.players[0].self_accelerate(Vector2.DOWN, delta_seconds);
        // }
    }
}