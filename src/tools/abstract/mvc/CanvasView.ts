import { ControllerEventConstructor } from "./helpers/ControllerEvent"
import { View } from "./View";

export class CanvasView extends View {
    protected context: CanvasRenderingContext2D;
    public constructor(public canvas: HTMLCanvasElement) {
        super();
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("could not create context");
        this.context = ctx;
    }

}