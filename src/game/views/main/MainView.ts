import { CanvasView } from "../../../tools/abstract/mvc/CanvasView";
import { View } from "../../../tools/abstract/mvc/View";
import { consts } from "../../../tools/commons/Colors";
import { Color } from "../../../tools/data/Color";
import { ViewProperty } from "../../../tools/signals/ChainProperty";
import { Game } from "../../base/Game";
import { ViewCollection } from "../ViewCollection";


export class MainView extends CanvasView<ViewCollection> {
    public bg_color = new ViewProperty<this, Color>(this, consts.Colors.BLACK);
    public fg_color = new ViewProperty<this, Color>(this, consts.Colors.WHITE);
    public fields = new ViewProperty<this, Array<string>>(this, []);

    public draw(): void {
        this.context.fillStyle = this.bg_color.get().to_hex();
        this.context.fillRect(0, 0, 800, 600);
        const base_x = 200;
        const base_y = 100;
        const padding = 10;
        const cell_size = 400 / 3;
        const font_size = cell_size / 2;
        this.context.font = font_size + "px monospace";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        // this.context.textAlign = "right";
        this.fields.get().forEach((value, index) => {
            const x = index % 3;
            const y = (index - x) / 3;
            const screen_x = base_x + x * cell_size;
            const screen_y = base_y + y * cell_size;
            this.context.fillStyle = this.fg_color.get().to_hex();
            this.context.fillRect(screen_x + padding, screen_y + padding, cell_size - padding * 2, cell_size - padding * 2);
            this.context.fillStyle = this.bg_color.get().to_hex();
            this.context.fillText(value, screen_x + cell_size / 2, screen_y + cell_size / 2);
        });
    }

}