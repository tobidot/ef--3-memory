import p5 from "p5";
import { View } from "../../../tools/abstract/mvc/View";
import { ViewProperty } from "../../../tools/signals/ChainProperty";
import { consts } from "../../consts/Colors";


export class InfoView extends View {
    public p = new ViewProperty<this, p5 | null>(this, null);
    public fg_color = new ViewProperty<this, consts.Color>(this, consts.Color.WHITE);
    public bg_color = new ViewProperty<this, consts.Color>(this, consts.Color.BLACK);
    public text = new ViewProperty<this, Array<string>>(this, []);

    public draw(): void {
        const p = this.p.get();
        if (!p) return;
        const bg_color = consts.color_to_p5(p, this.bg_color.get());
        const fg_color = consts.color_to_p5(p, this.fg_color.get());
        p.textSize(25);
        p.background(bg_color);
        p.color(fg_color);
        p.stroke(fg_color);
        p.fill(fg_color);
        const start_y = this.get_y();
        const start_x = this.get_x();
        this.text.get().forEach((line, index) => {
            p.text(line, start_x, index * 30 + start_y);
        });
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