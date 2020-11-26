export class Vector2 {
    public x: number;
    public y: number;
    public constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
    public set(other: Vector2): this {
        this.x = other.x;
        this.y = other.y;
        return this;
    }
    public sub(other: Vector2): this {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
    public add(other: Vector2): this {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    public mul(scalar: number): this {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    public divide(scalar: number): this {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }
    public len2(): number {
        return this.x * this.x + this.y * this.y;
    }
    public len(): number {
        return Math.sqrt(this.len2());
    }
    public set_magnitude(magnitude: number): this {
        const len = this.len();
        this.x = this.x / len * magnitude;
        this.y = this.y / len * magnitude;
        return this;
    }
    public dot(other: Vector2): number {
        return this.x * other.x + this.y * other.y;
    }
    public cross(other: Vector2): Vector2 {
        return new Vector2(this.x * other.y, this.y * other.x);
    }
    public cpy(): Vector2 {
        return new Vector2(this.x, this.y);
    }
    public normalize(): this {
        const len = this.len();
        if (len < 0.000001) return this;
        this.x /= len;
        this.y /= len;
        return this;
    }
    public get_projection_of(other: Vector2): Vector2 {
        const len = this.dot(other) / this.len2();
        return this.cpy().mul(len);
    }
    public is_null_vector(): boolean {
        return Math.abs(this.x) < 0.001 && Math.abs(this.y) < 0.001;
    }
}