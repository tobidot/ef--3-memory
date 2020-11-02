import { View } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import p5 from "p5";
import { GameView } from "../../../tools/GameView";
import { ViewProperty } from "../../../tools/ViewProperty";
import { consts } from "../../consts/Colors";


export class InfoView extends GameView {
    public fg_color = new ViewProperty<this, consts.Color>(this, consts.Color.WHITE);
    public bg_color = new ViewProperty<this, consts.Color>(this, consts.Color.BLACK);
    public text = new ViewProperty<this, Array<string>>(this, []);

    public constructor(public p: p5) {
        super();
    }

    public draw(): void {
        const bg_color = consts.color_to_p5(this.p, this.bg_color.get());
        const fg_color = consts.color_to_p5(this.p, this.fg_color.get());
        this.p.textSize(25);
        this.p.background(bg_color);
        this.p.color(fg_color);
        this.p.stroke(fg_color);
        this.p.fill(fg_color);
        const start_y = this.get_y();
        const start_x = this.get_x();
        this.text.get().forEach((line, index) => {
            this.p.text(line, start_x, index * 30 + start_y);
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