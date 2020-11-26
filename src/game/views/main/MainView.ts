import { tools } from "@game.object/ts-game-toolbox";
import { CanvasView } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/CanvasView";
import { RgbColor } from "@game.object/ts-game-toolbox/dist/src/data/RgbColor";
import { ChainProperty } from "@game.object/ts-game-toolbox/dist/src/signals/ChainProperty";
import { Vector } from "p5";
import { Vector2 } from "../../../tools/data/Vector2";
import { ViewCollection } from "../ViewCollection";

interface ViewPlanetAttr {
    position: Vector2;
    radius: number;
}
interface ViewPlayerAttr {
    position: Vector2;
}
export class MainView extends CanvasView<ViewCollection> {
    public bg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.BLACK);
    public fg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.WHITE);
    public planets = new ChainProperty<this, Array<ViewPlanetAttr>>(this, []);
    public players = new ChainProperty<this, Array<ViewPlayerAttr>>(this, []);

    public timestamp = performance.now();
    public update_ts = 0;
    public fps: string = "";

    public draw(): void {
        this.reset_canvas_state();
        this.context.fillStyle = this.bg_color.get().to_hex();
        this.context.fillRect(0, 0, 800, 600);
        this.context.fillStyle = this.fg_color.get().to_hex();
        this.context.translate(400, 300);
        const center = this.players.get().reduce((sum, player) => {
            return sum.add(player.position);
        }, new Vector2(0, 0));
        center.divide(this.players.get().length);
        this.context.translate(-center.x, -center.y);
        this.planets.get().forEach((planet, index) => {
            this.context.beginPath();
            this.context.arc(planet.position.x, planet.position.y, planet.radius, 0, 2 * Math.PI);
            this.context.fill();
        });
        this.context.fillStyle = this.fg_color.get().to_hex();
        this.players.get().forEach((player, index) => {
            this.context.fillRect(player.position.x - 5, player.position.y - 5, 10, 10);
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

}