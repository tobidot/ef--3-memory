import { GameView } from "../../tools/GameView";

export class ViewHandler {
    private current_view: GameView | null = null;

    public set_current_view(view: GameView) {
        if (this.current_view) this.current_view.update = null;
        this.current_view = view;
    }

    public draw() {
        if (!this.current_view) return;
        if (this.current_view.update) this.current_view.update();
        this.current_view.draw();
    }
}