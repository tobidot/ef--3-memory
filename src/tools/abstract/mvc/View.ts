export class View {
    public constructor() { }
    public update: (() => void) | null = null;
    public draw() { };

    public set_update(update: () => void): this {
        this.update = update;
        return this;
    }
}