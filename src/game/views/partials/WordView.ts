import p5 from "p5";
import { View } from "../../../tools/abstract/mvc/View";
import { Color } from "../../../tools/data/Color";
import { ViewProperty } from "../../../tools/signals/ChainProperty";
import { Game } from "../../base/Game";
import { consts } from "../../consts/Colors";

type Property<T> = ViewProperty<View, T>;
export class WordView extends View {
    public p = new ViewProperty<this, p5 | null>(this, null);
    public letters = new ViewProperty<this, Array<string>>(this, []);
    public letter_size = new ViewProperty<this, number>(this, 64);
    public color = new ViewProperty<this, Color>(this, consts.Colors.WHITE);
    public x = new ViewProperty<this, number>(this, 0);
    public y = new ViewProperty<this, number>(this, 0);

    draw(): void {
        const p = Game.p;
        if (!p) return;
        const color = this.color.get();
        const letter_size = this.letter_size.get();
        const letters = this.letters.get();
        const x = this.x.get() - letter_size * letters.length / 2;
        const y = this.y.get();
        const p_color = color.to_p5(p);
        p.stroke(p_color);
        p.strokeWeight(2);
        p.textSize(letter_size);
        letters.forEach((letter, index) => {
            if (letter === '') letter = '_';
            p.text(letter, letter_size * index + x, y);
        });
    }
}