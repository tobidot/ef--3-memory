import { BaseController } from "../BaseController";
import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";


export class GameEventController extends BaseController implements EventControllerInterface {

    public mouse_pressed(event: MouseEvent, cx: number, cy: number): ControllerRouteResponse {
        return null;
    }

    public key_down(event: KeyboardEvent): ControllerRouteResponse {
        if (event.key === "ArrowLeft") {
            this.models.game.players[0].velocity.x -= 0.01;
        } else if (event.key === "ArrowRight") {
            this.models.game.players[0].velocity.x += 0.01;
        }
        return null;
    }

    public key_up(event: KeyboardEvent): ControllerRouteResponse {
        return null;
    }

    public update(delta_seconds: number): ControllerRouteResponse {
        this.models.game.update(delta_seconds);

        this.views.main.planets.set([
            this.models.game.planet,
            this.models.game.moon,
        ]).players.set(
            this.models.game.players
        );
        return null;
    }
}