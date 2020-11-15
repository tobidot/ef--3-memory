export type Color = RGBColor;

export class RGBColor {
    public constructor(
        public r: number = 0,
        public g: number = 0,
        public b: number = 0,
        public a: number = 255,
    ) {

    }

    public to_hex(): string {
        return "#" + [this.a, this.r, this.g, this.b].map(v => v.toString(16)).join('');
    }

    public lerp(other: Color, t: number): RGBColor {
        return new RGBColor(
            this.r * (1 - t) + other.r * t,
            this.g * (1 - t) + other.g * t,
            this.b * (1 - t) + other.b * t,
            this.a * (1 - t) + other.a * t,
        );
    }
}