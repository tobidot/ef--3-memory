import { tools } from "@game.object/ts-game-toolbox";
import { CanvasView } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/CanvasView";
import { RgbColor } from "@game.object/ts-game-toolbox/dist/src/data/RgbColor";
import { ChainProperty } from "@game.object/ts-game-toolbox/dist/src/signals/ChainProperty";
import { Vector } from "p5";
import { Rect } from "../../../tools/data/Rect";
import { Vector2 } from "../../../tools/data/Vector2";
import { ViewCollection } from "../ViewCollection";

interface ViewPlanetAttr {
    position: Vector2;
    radius: number;
}
interface ViewPlayerAttr {
    position: Vector2;
    rotation: number;
}
interface ViewCameraAttr {
    area: Rect;
}

export class MainView extends CanvasView<ViewCollection> {
    public bg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.BLACK);
    public fg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.WHITE);
    public planets = new ChainProperty<this, Array<ViewPlanetAttr>>(this, []);
    public players = new ChainProperty<this, Array<ViewPlayerAttr>>(this, []);
    public camera = new ChainProperty<this, ViewCameraAttr>(this, { area: new Rect() });

    public timestamp = performance.now();
    public update_ts = 0;
    public fps: string = "";

    public draw(): void {
        this.reset_canvas_state();

        this.apply_camera();

        this.planets.get().forEach((planet, index) => {
            this.context.beginPath();
            this.context.arc(planet.position.x, planet.position.y, planet.radius, 0, 2 * Math.PI);
            this.context.fill();
        });
        this.context.fillStyle = this.fg_color.get().to_hex();
        this.players.get().forEach((player, index) => {
            const transform = this.context.getTransform();
            this.context.translate(player.position.x, player.position.y);
            this.context.rotate(player.rotation);
            this.context.fillRect(-10, - 10, 20, 20);
            this.context.setTransform(transform);
        });
        this.context.resetTransform();



        const now = performance.now();
        // console.log();
        if (this.update_ts-- === 0) {

            this.context.fillStyle = this.fg_color.get().to_hex();
            const fps = 60 * 1000 / (now - this.timestamp);
            this.fps = (fps.toString()).substr(0, 5);
            this.timestamp = now;
            this.update_ts = 60;
        }

        this.context.font = "16px monospace";
        this.context.fillText(this.fps, 750, 20);
    }

    protected reset_canvas_state() {
        super.reset_canvas_state();
        this.context.fillStyle = this.bg_color.get().to_hex();
        this.context.fillRect(0, 0, 800, 600);
        this.context.fillStyle = this.fg_color.get().to_hex();
    }

    protected apply_camera() {
        this.context.translate(400, 300);
        if (this.camera.get().area.width > 0 && this.camera.get().area.height > 0) {
            const width = this.camera.get().area.width + 150;
            const height = this.camera.get().area.height + 150;
            const scale_factor_x = Math.min(10, 800 / width);
            const scale_factor_y = Math.min(10, 600 / height);
            const scale_factor = Math.min(scale_factor_x, scale_factor_y);
            this.context.scale(scale_factor, scale_factor);
        }
        const center = this.camera.get().area.center;
        this.context.translate(-center.x, -center.y);
    }
}