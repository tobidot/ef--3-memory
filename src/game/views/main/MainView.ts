import p5 from "p5";
import { View } from "../../../tools/abstract/mvc/View";
import { Color } from "../../../tools/data/Color";
import { ViewProperty } from "../../../tools/signals/ChainProperty";
import { Game } from "../../base/Game";
import { consts } from "../../consts/Colors";
import { HangedManView } from "../partials/HangedManView";
import { WordView } from "../partials/WordView";
import { views } from "../ViewCollection";


export class MainView extends View {
    public fg_color: Color;
    public bg_color: Color;
    public letters: string[];
    public letters_guessed = new ViewProperty<this, string[]>(this, []);
    public death_progress: number;
    public lost_animation: number = 0;

    public constructor() {
        super();
        this.fg_color = consts.Colors.WHITE;
        this.bg_color = consts.Colors.BLACK;
        this.letters = [];
        this.death_progress = 0;
    }

    public draw(): void {
        const p = Game.p;
        if (!p) return;
        const color = this.bg_color.to_p5(p);
        p.background(color);
        views.partials.word
            .letter_size.set(64)
            .x.set(400)
            .y.set(500)
            .color.set(this.fg_color)
            .letters.set(this.letters)
            .draw();
        const hangman_color = consts.Colors.WHITE.lerp(
            consts.Colors.RED,
            Math.max(0, Math.min(1, this.lost_animation))
        );
        views.partials.hanged_man
            .image_progress.set(0)
            .color.set(hangman_color)
            .x.set(200)
            .y.set(50)
            .image_progress.set(this.death_progress)
            .draw();
        views.partials.named_letters
            .letters.set(this.letters_guessed.get())
            .draw();
        p.textSize(24);
        p.strokeWeight(1);
        p.fill(255);
        p.text("Type the letter you want to guess", 200, 25);
        p.line(0, 425, 800, 425);
    }

    public set_colors(fg: Color, bg?: Color): this {
        this.fg_color = fg;
        if (bg !== undefined) this.bg_color = bg;
        return this;
    }

    public set_letters(letters: Array<string>): this {
        this.letters = letters;
        return this;
    }

}