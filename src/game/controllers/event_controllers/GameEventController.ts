import { BaseController } from "../BaseController";
import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { Rect } from "@game.object/ts-game-toolbox/dist/src/geometries/Rect";
import { MemoryCardModel } from "../../models/MemoryCardModel";
import { CameraModel } from "../../models/CameraModel";

export class GameEventController extends BaseController implements EventControllerInterface {

    public update(delta_seconds: number): ControllerRouteResponse {
        return null;
    }

    public mouse_pressed(event: MouseEvent, x: number, y: number): ControllerRouteResponse {
        const camera: CameraModel = this.models.camera;
        let hit: MemoryCardModel | null = this.models.cards.all()
            .reduce((hit: MemoryCardModel, next: MemoryCardModel) => {
                const screen_collider = camera.transformRect(new Rect().set(next.collider));
                if (screen_collider.contains({ x, y })) return next;
                return hit;
            });
        if (hit !== null) {
            (hit).is_revealed = true;
        }
        return null;
    }

}