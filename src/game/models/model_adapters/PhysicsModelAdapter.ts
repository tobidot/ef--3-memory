import { Vector2, Vector2I } from "../../../tools/data/Vector2";

export interface PhysicsModelInterface {
    position: Vector2;
    velocity: Vector2;
    rotation: number;
    is_grounded: boolean;
}

export class PhysicsModelAdapter {

    public constructor(public object: PhysicsModelInterface) { }

    public rotate_to_center(center: Readonly<Vector2I>) {
        this.object.rotation = this.object.position.cpy().sub(center).get_angle();
    }

    public accelerate(direction: Readonly<Vector2I>) {
        this.object.velocity.add(new Vector2(direction).rotate_radians_clockwise(this.object.rotation));
    }

    public set_local_velocity(direction: Readonly<Vector2I>) {
        this.object.velocity.set(new Vector2(direction).rotate_radians_clockwise(this.object.rotation));
    }

    public update(delta_seconds: number) {
        if (this.object.is_grounded && this.object.velocity.len2() < 5) {
            this.object.velocity.set({ x: 0, y: 0 });
        }
        this.object.position.x += this.object.velocity.x * delta_seconds;
        this.object.position.y += this.object.velocity.y * delta_seconds;
        this.object.velocity.mul(this.object.is_grounded ? 0.999 : 0.7);
    }
}