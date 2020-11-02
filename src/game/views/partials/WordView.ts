import p5 from "p5";
import { View } from "../../../tools/abstract/mvc/View";
import { ViewProperty } from "../../../tools/signals/ChainProperty";
import { consts } from "../../consts/Colors";

type Property<T> = ViewProperty<View, T>;
export class WordView extends View {
    public p = new ViewProperty<this, p5 | null>(this, null);
    public letters = new ViewProperty<this, Array<string>>(this, []);
    public letter_size = new ViewProperty<this, number>(this, 64);
    public color = new ViewProperty<this, consts.Color>(this, consts.Color.WHITE);
    public x = new ViewProperty<this, number>(this, 0);
    public y = new ViewProperty<this, number>(this, 0);

    draw(): void {
        const p = this.p.get();
        if (!p) return;
        const color = this.color.get();
        const letter_size = this.letter_size.get();
        const letters = this.letters.get();
        const x = this.x.get() - letter_size * letters.length / 2;
        const y = this.y.get();
        const p_color = consts.color_to_p5(p, color);
        p.stroke(p_color);
        p.strokeWeight(2);
        p.textSize(letter_size);
        letters.forEach((letter, index) => {
            if (letter === '') letter = '_';
            p.text(letter, letter_size * index + x, y);
        });
    }
}