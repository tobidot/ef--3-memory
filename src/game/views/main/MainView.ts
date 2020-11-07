import p5 from "p5";
import { View } from "../../../tools/abstract/mvc/View";
import { ViewProperty } from "../../../tools/signals/ChainProperty";
import { Game } from "../../base/Game";
import { consts } from "../../consts/Colors";
import { HangedManView } from "../partials/HangedManView";
import { WordView } from "../partials/WordView";
import { views } from "../ViewCollection";


export class MainView extends View {
    public fg_color: consts.Color;
    public bg_color: consts.Color;
    public letters: string[];
    public death_progress: number;

    public constructor() {
        super();
        this.fg_color = consts.Color.WHITE;
        this.bg_color = consts.Color.BLACK;
        this.letters = [];
        this.death_progress = 0;
    }

    public draw(): void {
        const p = Game.p;
        if (!p) return;
        const color = consts.color_to_p5(p, this.bg_color);
        p.background(color);
        views.partials.word
            .letter_size.set(64)
            .x.set(400)
            .y.set(500)
            .color.set(this.fg_color)
            .letters.set(this.letters)
            .draw();
        views.partials.hanged_man
            .image_progress.set(0)
            .color.set(consts.Color.WHITE)
            .x.set(200)
            .y.set(50)
            .image_progress.set(this.death_progress)
            .draw();
    }

    public draw_word(x: number, y: number, letter_spacing: number) {
    }

    public set_colors(fg: consts.Color, bg?: consts.Color): this {
        this.fg_color = fg;
        if (bg !== undefined) this.bg_color = bg;
        return this;
    }

    public set_letters(letters: Array<string>): this {
        this.letters = letters;
        return this;
    }

}