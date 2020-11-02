import p5 from "p5";
import { GameView } from "../../../tools/GameView";
import { ViewProperty } from "../../../tools/ViewProperty";
import { consts } from "../../consts/Colors";

type Property<T> = ViewProperty<GameView, T>;
export class HangedManView extends GameView {
    public image_progress = new ViewProperty<this, number>(this, 0);
    public color = new ViewProperty<this, consts.Color>(this, consts.Color.WHITE);
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

    constructor(public p: p5) {
        super();
    }

    public draw(): void {
        const color = this.color.get();
        const x = this.x.get();
        const y = this.y.get();
        const image_progress = this.image_progress.get();
        const lines_to_draw = Math.floor(this.lines.length * Math.min(1, image_progress));

        const p_color = consts.color_to_p5(this.p, color);
        this.p.fill(0);
        this.p.stroke(p_color);
        this.p.strokeWeight(5);
        for (let i = 0; i < lines_to_draw; ++i) {
            const line = this.lines[i];
            if (line.length === 4) {
                this.p.line(line[0], line[1], line[2], line[3]);
            } else {
                this.p.circle(line[0], line[1], line[2]);
            }
        }
    }
}