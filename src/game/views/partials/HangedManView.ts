import p5 from "p5";
import { View } from "../../../tools/abstract/mvc/View";
import { Color } from "../../../tools/data/Color";
import { ViewProperty } from "../../../tools/signals/ChainProperty";
import { Game } from "../../base/Game";
import { consts } from "../../consts/Colors";

type Property<T> = ViewProperty<View, T>;
export class HangedManView extends View {
    public image_progress = new ViewProperty<this, number>(this, 0);
    public color = new ViewProperty<this, Color>(this, consts.Colors.WHITE);
    public x = new ViewProperty<this, number>(this, 0);
    public y = new ViewProperty<this, number>(this, 0);


    protected lines = [
        [400, 350, 450, 400],
        [400, 350, 350, 400],
        [400, 50, 400, 350],
        [400, 50, 550, 50],
        [550, 50, 550, 100],
        [550, 125, 25],
        [550, 150, 550, 220],
        [550, 160, 525, 180],
        [550, 160, 575, 180],
        [550, 220, 525, 280],
        [550, 220, 575, 280],
    ];

    public draw(): void {
        const p = Game.p;
        if (!p) return;
        const color = this.color.get();
        const x = this.x.get();
        const y = this.y.get();
        const image_progress = this.image_progress.get();
        const lines_to_draw = Math.floor(this.lines.length * Math.min(1, image_progress));

        const p_color = color.to_p5(p);
        const red_color = consts.Colors.RED.to_p5(p);
        p.fill(0);
        p.stroke(p_color);
        p.strokeWeight(5);
        for (let i = 0; i < lines_to_draw; ++i) {
            const line = this.lines[i];
            if (line.length === 4) {
                p.line(line[0], line[1], line[2], line[3]);
            } else {
                p.circle(line[0], line[1], line[2]);
            }
        }
    }
}