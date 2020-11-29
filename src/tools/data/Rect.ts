import { Rect as RectBase } from "@game.object/ts-game-toolbox/dist/src/geometries/Rect"
import { Vector2 } from "./Vector2";

export class Rect extends RectBase {
    public set(x: number, y: number, w?: number, h?: number): this {
        this.x = x;
        this.y = y;
        if (w !== undefined) this.w = w;
        if (h !== undefined) this.h = h;
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

    public get width(): number {
        return this.w;
    }

    public get height(): number {
        return this.h;
    }

    public get left(): number {
        return this.x - this.w / 2;
    }

    public lerp(target: Rect, t: number): this {
        const it = 1 - t;
        this.x = this.x * it + target.x * t;
        this.y = this.y * it + target.y * t;
        this.w = this.w * it + target.w * t;
        this.h = this.h * it + target.h * t;
        return this;
    }
}