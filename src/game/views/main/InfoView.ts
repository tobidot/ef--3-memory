import { CanvasView } from "../../../tools/abstract/mvc/CanvasView";
import { View } from "../../../tools/abstract/mvc/View";
import { Color } from "../../../tools/data/Color";
import { ViewProperty } from "../../../tools/signals/ChainProperty";
import { consts } from "../../consts/Colors";


export class InfoView extends CanvasView {
    public fg_color = new ViewProperty<this, Color>(this, consts.Colors.WHITE);
    public bg_color = new ViewProperty<this, Color>(this, consts.Colors.BLACK);
    public text = new ViewProperty<this, Array<string>>(this, []);

    public draw(): void {
        const context: CanvasRenderingContext2D = this.context;
        const bg_color = this.bg_color.get();
        const fg_color = this.fg_color.get();
        context.font = ("Arial 25px");
        context.fillStyle = (bg_color.to_hex());
        context.clearRect(0, 0, 800, 600);
        context.fillStyle = (fg_color.to_hex());
        context.strokeStyle = (fg_color.to_hex());
        const start_y = this.get_y();
        const start_x = this.get_x();
        this.text.get().forEach((line, index) => {
            context.fillText(line, start_x, index * 30 + start_y);
        });
        context.fillText("Press Enter to continue!", 450, 550);
    }

    protected get_y(): number {
        return 300 - this.text.get().length * 30 / 2;
    }

    protected get_x(): number {
        if (this.text.get().length !== 1) return 50;
        const line = this.text.get()[0];
        return 400 - line.length * 6;
    }

}