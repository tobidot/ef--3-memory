import { View } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import p5 from "p5";
import { GameView } from "../../../tools/GameView";
import { consts } from "../../consts/Colors";


export class MainView extends GameView {
    public color: consts.Color;

    public constructor(public p: p5) {
        super();
        this.color = consts.Color.BLACK;
    }

    public draw(): void {
        const color = consts.color_to_p5(this.p, this.color);
        this.p.background(color);
        this.p.fill(200, 0, 0);
        this.p.rect(0, 0, 100, 100);
    }

    public set_color(color: consts.Color): this {
        this.color = color;
        return this;
    }

}