import { View } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import p5 from "p5";
import { GameView } from "../../../tools/GameView";
import { consts } from "../../consts/Colors";
import { HangedManView } from "../partials/HangedManView";
import { WordView } from "../partials/WordView";


export class MainView extends GameView {
    public fg_color: consts.Color;
    public bg_color: consts.Color;
    public letters: string[];
    public death_progress: number;

    private word_view: WordView;
    private hanged_man_view: HangedManView;

    public constructor(public p: p5) {
        super();
        this.word_view = new WordView(p)
            .letter_size.set(64)
            .x.set(400)
            .y.set(500);
        this.hanged_man_view = new HangedManView(p)
            .image_progress.set(0)
            .color.set(consts.Color.WHITE)
            .x.set(200)
            .y.set(50);
        this.fg_color = consts.Color.WHITE;
        this.bg_color = consts.Color.BLACK;
        this.letters = [];
        this.death_progress = 0;
    }

    public draw(): void {
        const color = consts.color_to_p5(this.p, this.bg_color);
        this.p.background(color);
        this.word_view
            .color.set(this.fg_color)
            .letters.set(this.letters)
            .draw();
        this.hanged_man_view
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