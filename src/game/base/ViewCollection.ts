import p5 from "p5";
import { GameView } from "../../tools/GameView";
import { InfoView } from "../views/main/InfoView";
import { MainView } from "../views/main/MainView";

export class ViewCollection extends GameView {
    public main: MainView;
    public info: InfoView;

    public constructor(p: p5) {
        super();
        this.main = new MainView(p);
        this.info = new InfoView(p);
    }
}