import { create_controllers } from "../controllers/ControllerCollection";
import { create_views } from "../views/ViewCollection";
import { MVCGame } from "../../tools/abstract/mvc/MVCgame";
import { GameGlobal } from "./GameGlobal";
import { create_models } from "../models/ModelCollection";

export class Game extends MVCGame {
    public references: GameGlobal;

    constructor() {
        super();
        const canvas = document.getElementById('canvas');
        if (!(canvas instanceof HTMLCanvasElement)) throw new Error("Canvas not found");
        const models = create_models(this);
        const views = create_views(canvas);
        const controllers = create_controllers(models, views);
        this.references = {
            ingame_time_in_seconds: 0,
            models,
            controllers,
            views,
        };
        canvas.addEventListener("keydown", (event) => {
            if (!this.active_controller) return;
            if (this.active_controller.key_pressed) {
                this.apply_controller_response(this.active_controller.key_pressed(event));
            }
        });
        canvas.addEventListener("click", (event) => {
            if (!this.active_controller) return;
            if (this.active_controller.mouse_pressed) {
                const x = (event.x - canvas.offsetLeft) * canvas.width / canvas.clientWidth;
                const y = (event.y - canvas.offsetTop) * canvas.height / canvas.clientHeight;
                const response = this.active_controller.mouse_pressed(event, x, y);
                this.apply_controller_response(response);
            }
        });
        this.apply_controller_response(controllers.game_controller.new_game());
    }

    public update(delta_seconds: number) {
        this.references.ingame_time_in_seconds += delta_seconds;
        super.update(delta_seconds);
    }
}