import {tools} from "@game.object/ts-game-toolbox";
import {CanvasView} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/CanvasView";
import {RgbColor} from "@game.object/ts-game-toolbox/dist/src/data/RgbColor";
import {ChainProperty} from "@game.object/ts-game-toolbox/dist/src/signals/ChainProperty";
import {Rect} from "../../../tools/data/Rect";
import {Vector2} from "../../../tools/data/Vector2";
import {ViewCollection} from "../ViewCollection";


interface ViewPlanetAttr {
    position: Vector2;
    radius: number;
    image: HTMLImageElement | null;
}

interface ViewPlayerAttr {
    position: Vector2;
    collision_box: Rect;
    rotation: number;
    image: HTMLImageElement | null;
    damage: number;
}

interface ViewGraphicEffectAttr {
    fading_progress: number;
    target: Rect;
    image: HTMLImageElement | null;
}

interface ViewCameraAttr {
    area: Rect;
}

export class MainView extends CanvasView<ViewCollection> {
    public bg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.BLACK);
    public fg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.WHITE);
    public planets = new ChainProperty<this, Array<ViewPlanetAttr>>(this, []);
    public players = new ChainProperty<this, Array<ViewPlayerAttr>>(this, []);
    public graphic_effects = new ChainProperty<this, Array<ViewGraphicEffectAttr>>(this, []);
    public camera = new ChainProperty<this, ViewCameraAttr>(this, {area: new Rect()});

    public round = new ChainProperty<this, number>(this, 1);
    public round_animation_progress = new ChainProperty<this, number>(this, 0);
    public enemies_remaining = new ChainProperty<this, number>(this, 0);

    public timestamp = performance.now();
    public update_ts = 0;
    public fps: string = "";

    public draw(): void {
        this.reset_canvas_state();

        this.apply_camera();

        this.planets.get().forEach((planet, index) => {
            if (planet.image) {
                this.context.drawImage(
                    planet.image,
                    planet.position.x - planet.radius,
                    planet.position.y - planet.radius,
                    planet.radius * 2,
                    planet.radius * 2,
                )
            } else {
                this.context.beginPath();
                this.context.arc(planet.position.x, planet.position.y, planet.radius, 0, 2 * Math.PI);
                this.context.fill();
            }
        });
        this.context.fillStyle = this.fg_color.get().to_hex();
        this.players.get().forEach((player, index) => {
            const transform = this.context.getTransform();
            this.context.translate(player.position.x, player.position.y);


            const start = Math.PI * 5 / 4;
            const damage_progress = player.damage / 1000;
            const radius = player.collision_box.w;
            const end = start + Math.PI / 2 * damage_progress;

            this.context.strokeStyle = "3px solid gray";
            this.context.beginPath();
            this.context.arc(
                0, 0,
                radius,
                start, end
            );
            this.context.stroke();
            this.context.strokeStyle = "1px solid red";
            this.context.beginPath();
            this.context.arc(
                0, 0,
                radius,
                start, end
            );
            this.context.stroke();


            this.context.rotate(player.rotation);
            if (player.image) {
                this.context.drawImage(
                    player.image,
                    player.collision_box.x,
                    player.collision_box.y,
                    player.collision_box.w,
                    player.collision_box.h
                );
            } else {
                this.context.fillRect(
                    player.collision_box.x,
                    player.collision_box.y,
                    player.collision_box.w,
                    player.collision_box.h
                );
            }
            this.context.setTransform(transform);
        });

        this.graphic_effects.get().forEach((effect, index) => {
            const transform = this.context.getTransform();
            //this.context.translate(effect.position.x, effect.position.y);
            //this.context.rotate(player.rotation);
            if (effect.image) {
                this.context.save();
                this.context.globalAlpha = 1 - effect.fading_progress;
                this.context.drawImage(
                    effect.image,
                    effect.target.x,
                    effect.target.y,
                    effect.target.w,
                    effect.target.h,
                );
                this.context.restore();
            } else {

            }
            this.context.setTransform(transform);
        });
        this.context.resetTransform();

        this.context.font = "42px monospace";
        this.context.textAlign = ('start');
        this.context.textBaseline = ('top');
        this.context.save();
        const p = this.round_animation_progress.get();
        const z = Math.max(1, (1 - p * p) * 18);
        this.context.translate(775, 535);
        this.context.scale(z, z);
        this.context.textAlign = ('center');
        this.context.fillStyle = "#22ee00";
        this.context.fillText(this.round.get().toString(), -25, -35);
        this.context.restore();

        this.context.fillStyle = "#aaaaaa";
        this.context.fillText("Round ", 550, 500);
        this.context.fillText("Enemies " + this.enemies_remaining.get().toString(), 500, 550);

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