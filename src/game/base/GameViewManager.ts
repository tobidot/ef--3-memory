import { ViewManager } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import p5 from "p5";

export class GameViewManager extends ViewManager {

    constructor(public p: p5) {
        super(p);
    }

}