import { tools } from "@game.object/ts-game-toolbox";
import { CanvasView } from "@game.object/ts-game-toolbox/src/abstract/mvc/CanvasView";
import { RgbColor } from "@game.object/ts-game-toolbox/src/data/RgbColor";
import { ChainProperty } from "@game.object/ts-game-toolbox/dist/src/signals/ChainProperty";
import { ViewCollection } from "../ViewCollection";
import { Vector2, Vector2I } from "@game.object/ts-game-toolbox/dist/src/geometries/Vector2";
import { RectI } from "@game.object/ts-game-toolbox/dist/src/geometries/Rect";
import { CameraModel } from "../../models/CameraModel";

interface ViewMemoryCardAttr {
    collider: RectI;
    is_revealed: boolean;
    color: RgbColor;
}

export class MainView extends CanvasView<ViewCollection> {
    /// Base Colors
    public bg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.BLACK);
    public fg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.WHITE);
    /// memory cards
    public memory_cards = new ChainProperty<this, Array<ViewMemoryCardAttr>>(this, []);
    // Camera
    public camera = new ChainProperty<this, CameraModel | null>(this, null);

    /// configuration
    private readonly card_bg_color = new RgbColor(0x08, 0x08, 0x08);

    public draw(): void {
        this.reset_canvas_state();
        const camera = this.camera.get();
        if (!camera) {
            console.log('no camera');
            return;
        }
        this.context.translate(camera.center.x, camera.center.y);
        this.context.strokeStyle = "#282828";
        this.memory_cards.get().forEach((card: ViewMemoryCardAttr) => {
            if (card.is_revealed) {
                this.context.fillStyle = card.color.to_hex();
            } else {
                this.context.fillStyle = this.card_bg_color.to_hex();
            }
            this.context.fillRect(card.collider.x, card.collider.y, card.collider.w, card.collider.h);
            this.context.strokeRect(card.collider.x, card.collider.y, card.collider.w, card.collider.h);
        });
        this.context.resetTransform();
    }

    /**
     * Reset default canvas state and paint the background
     */
    protected reset_canvas_state() {
        super.reset_canvas_state();
        this.context.fillStyle = this.bg_color.get().to_hex();
        this.context.fillRect(0, 0, 800, 600);
        this.context.fillStyle = this.fg_color.get().to_hex();
        this.context.font = "16px monospace";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.imageSmoothingEnabled = false;
    }
}