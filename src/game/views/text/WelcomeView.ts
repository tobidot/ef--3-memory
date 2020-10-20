import { View } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import p5 from "p5";

export class WelcomeView extends View {
    public constructor(public p: p5) {
        super();
    }

    public load(): void {
        document.addEventListener("keypress", this.key_pressed);
    }

    public unload(): void {
        document.removeEventListener("keypress", this.key_pressed);

    }

    public draw(): void {
        this.p.text('Welcome', 40, 40);
    }

    public key_pressed = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
        }
    }
}