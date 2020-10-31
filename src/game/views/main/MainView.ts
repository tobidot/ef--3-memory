import { View } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import p5 from "p5";
import { GameView } from "../../../tools/GameView";
import { consts } from "../../consts/Colors";
import { WordView } from "../partials/WordView";


export class MainView extends GameView {
    public fg_color: consts.Color;
    public bg_color: consts.Color;
    public letters: string[];
    private word_view: WordView;

    public constructor(public p: p5) {
        super();
        this.word_view = new WordView(p)
            .letter_size.set(64)
            .x.set(400)
            .y.set(450);
        this.fg_color = consts.Color.WHITE;
        this.bg_color = consts.Color.BLACK;
        this.letters = [];
    }

    public draw(): void {
        const color = consts.color_to_p5(this.p, this.bg_color);
        this.p.background(color);
        this.word_view
            .color.set(this.fg_color)
            .letters.set(this.letters)
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