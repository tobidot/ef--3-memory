import p5 from "p5";
import { View } from "../../../tools/abstract/mvc/View";
import { ViewProperty } from "../../../tools/signals/ChainProperty";
import { Game } from "../../base/Game";
import { consts } from "../../consts/Colors";

export class NamedLettersView {
    public letters = new ViewProperty<this, Array<string>>(this, []);

    public draw(): void {
        const p = Game.p;
        if (!p) return;
        const letters = this.letters.get();
        p.stroke(255);
        p.fill(255);
        p.strokeWeight(1);
        p.textSize(20);
        letters.forEach((letter, index: number) => {
            let x = 25 + 25 * (index % 4);
            let y = 25 + 20 * Math.floor((index / 4));
            p.text(letter, x, y);
        });
    }
}