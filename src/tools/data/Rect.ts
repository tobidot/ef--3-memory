import { Rect as RectBase } from "@game.object/ts-game-toolbox/dist/src/geometries/Rect"
import { Vector2, Vector2I } from "./Vector2";


interface RectI {
    x: number;
    y: number;
    w: number;
    h: number;
}
export class Rect extends RectBase {
    public cpy(): Rect {
        return new Rect(this.x, this.y, this.w, this.h);
    }

    public set(x: RectI): this;
    public set(x: number, y: number, w?: number, h?: number): this;
    public set(x: number | RectI, y?: number, w?: number, h?: number): this {
        if (typeof x === "object") {
            this.x = x.x;
            this.y = x.y;
            this.w = x.w;
            this.h = x.h;
        } else {
            this.x = x;
            this.y = y as number;
            if (w !== undefined) this.w = w;
            if (h !== undefined) this.h = h;
        }
        return this;
    }

    public expand_to(target: Readonly<Vector2>): this {
        if (this.contains(target)) return this;
        const left = Math.min(this.x, target.x);
        const top = Math.min(this.y, target.y);
        const right = Math.max(this.get_right(), target.x);
        const bottom = Math.max(this.get_bottom(), target.y);
        return this.set(left, top, right - left, bottom - top);
    }

    public get center(): Vector2 {
        return new Vector2(this.x + this.w / 2, this.y + this.h / 2);
    }

    public set center(center: Vector2) {
        this.x = center.x;
        this.y = center.y;
    }

    public set_center(center: Vector2I): this {
        this.x = center.x;
        this.y = center.y;
        return this;
    }

    public get width(): number {
        return this.w;
    }

    public get height(): number {
        return this.h;
    }

    public get left(): number {
        return this.x;
    }

    public get top(): number {
        return this.y;
    }

    public get right(): number {
        return this.x + this.width;
    }

    public get bottom(): number {
        return this.y + this.height;
    }

    public lerp(target: Rect, t: number): this {
        const it = 1 - t;
        this.x = this.x * it + target.x * t;
        this.y = this.y * it + target.y * t;
        this.w = this.w * it + target.w * t;
        this.h = this.h * it + target.h * t;
        return this;
    }

    /**
     * left_top
     * right_top
     * right_bottom
     * left_bottom
     */
    public get_corners(): [Vector2I, Vector2I, Vector2I, Vector2I] {
        return [
            { x: this.left, y: this.top },
            { x: this.right, y: this.top },
            { x: this.right, y: this.bottom },
            { x: this.left, y: this.bottom },
        ];
    }
}