import { tools } from "@game.object/ts-game-toolbox";
import { CanvasView } from "@game.object/ts-game-toolbox/src/abstract/mvc/CanvasView";
import { RgbColor } from "@game.object/ts-game-toolbox/src/data/RgbColor";
import { ChainProperty } from "@game.object/ts-game-toolbox/dist/src/signals/ChainProperty";
import { ViewCollection } from "../ViewCollection";
import { Vector2, Vector2I } from "@game.object/ts-game-toolbox/dist/src/geometries/Vector2";

interface ViewMemoryCardAttr {
    position: Vector2I;
    is_revealed: boolean;
    color: RgbColor;
}

export class MainView extends CanvasView<ViewCollection> {
    /// Base Colors
    public bg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.BLACK);
    public fg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.WHITE);
    /// memory cards
    public memory_cards = new ChainProperty<this, Array<ViewMemoryCardAttr>>(this, []);

    /// configuration
    private readonly card_size = 50;
    private readonly card_space = 80;
    private readonly card_bg_color = tools.commons.Colors.RED;

    public draw(): void {
        this.reset_canvas_state();
        this.context.fillText("Example", 400, 300);
        this.context.translate(400 - this.card_space * 2.5, 300 - this.card_space * 2.5);
        // this.context.translate(400, 300);
        this.memory_cards.get().forEach((card: ViewMemoryCardAttr) => {
            if (card.is_revealed) {
                this.context.fillStyle = card.color.to_hex();
            } else {
                this.context.fillStyle = this.card_bg_color.to_hex();
            }
            this.context.fillRect(card.position.x, card.position.y, this.card_size, this.card_size);
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