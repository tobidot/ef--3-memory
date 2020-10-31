import p5 from "p5";
import { GameView } from "../../../tools/GameView";
import { ViewProperty } from "../../../tools/ViewProperty";
import { consts } from "../../consts/Colors";

type Property<T> = ViewProperty<GameView, T>;
export class WordView extends GameView {
    public letters = new ViewProperty<WordView, Array<string>>(this, []);
    public letter_size = new ViewProperty<WordView, number>(this, 64);
    public color = new ViewProperty<WordView, consts.Color>(this, consts.Color.WHITE);
    public x = new ViewProperty<WordView, number>(this, 0);
    public y = new ViewProperty<WordView, number>(this, 0);

    constructor(public p: p5) {
        super();
    }

    draw(): void {
        const color = this.color.get();
        const letter_size = this.letter_size.get();
        const letters = this.letters.get();
        const x = this.x.get() - letter_size * letters.length / 2;
        const y = this.y.get();
        const p_color = consts.color_to_p5(this.p, color);
        this.p.stroke(p_color);
        this.p.textSize(letter_size);
        letters.forEach((letter, index) => {
            if (letter === '') letter = '_';
            this.p.text(letter, letter_size * index + x, y);
        });
    }
}