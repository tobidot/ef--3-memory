import {tools} from "@game.object/ts-game-toolbox";
import {CanvasView} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/CanvasView";
import {RgbColor} from "@game.object/ts-game-toolbox/dist/src/data/RgbColor";
import {ChainProperty} from "@game.object/ts-game-toolbox/dist/src/signals/ChainProperty";
import {ViewCollection} from "../ViewCollection";
import {Vector2, Vector2I} from "@game.object/ts-game-toolbox/dist/src/geometries/Vector2";

interface ViewStarAttr {
    position: Vector2I;
    z: number;
    size: number;
    color: RgbColor;
}

export class MainView extends CanvasView<ViewCollection> {
    public bg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.BLACK);
    public fg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.WHITE);
    public stars = new ChainProperty<this, Array<ViewStarAttr>>(this, []);

    public draw(): void {
        this.reset_canvas_state();
        this.stars.get().forEach((star) => {
            const real_position = new Vector2(star.position).mul(33 / (star.z )).add({x: 400, y: 300});
            const size = star.size * 100 / star.z;
            this.context.strokeStyle = star.color.to_hex();
            this.context.fillStyle = star.color.to_hex();
            this.context.fillRect(real_position.x - size / 2, real_position.y - size / 2, size, size);
        });
    }

    protected reset_canvas_state() {
        super.reset_canvas_state();
        this.context.fillStyle = this.bg_color.get().to_hex();
        this.context.fillRect(0, 0, 800, 600);
        this.context.imageSmoothingEnabled = false;
    }
}