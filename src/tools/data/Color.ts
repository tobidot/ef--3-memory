import p5, { RGB } from "p5";

export type Color = RGBColor;

export class RGBColor {
    public constructor(
        public r: number = 0,
        public g: number = 0,
        public b: number = 0,
        public a: number = 255,
    ) {

    }

    public to_p5(p: p5): p5.Color {
        return p.color(this.r, this.g, this.b, this.a);
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