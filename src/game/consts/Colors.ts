import p5 from "p5";

export namespace consts {
    export enum Color {
        RED,
        BLUE,
        GREEN,
        BLACK,
        WHITE
    }

    export function color_to_p5(p, color: Color): p5.Color {
        switch (color) {
            case Color.RED: return p.color(255, 0, 0);
            case Color.GREEN: return p.color(0, 255, 0);
            case Color.BLUE: return p.color(0, 0, 255);
            case Color.WHITE: return p.color(255, 255, 255);
            case Color.BLACK: return p.color(0, 0, 0);

            default: return p.color(255, 255, 1);
        }
    }
}