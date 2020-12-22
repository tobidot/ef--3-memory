import { Vector2, Vector2I } from "../../../tools/data/Vector2";

export interface PhysicsModelInterface {
    require_reset: boolean;
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

    public local_accelerate(local_delta_velocity: Readonly<Vector2I>) {
        this.object.velocity.add(new Vector2(local_delta_velocity).rotate_radians_clockwise(this.object.rotation));
    }

    public set_local_velocity(local_velocity: Readonly<Vector2I>): void {
        this.object.velocity.set(new Vector2(local_velocity).rotate_radians_clockwise(this.object.rotation));
    }

    public get_local_velocity(): Vector2 {
        return this.object.velocity.cpy().rotate_radians_clockwise(-this.object.rotation);
    }

    public get_velocity_in_direction(direction: Readonly<Vector2I>): Vector2 {
        return new Vector2(direction).get_projection_of(this.object.velocity);
    }

    public get_up_vector(): Vector2 {
        return Vector2.from_angle(this.object.rotation);
    }

    public update(delta_seconds: number) {
        this.object.position.x += this.object.velocity.x * delta_seconds;
        this.object.position.y += this.object.velocity.y * delta_seconds;
        if (this.object.position.len2() > 1000000) {
            this.object.require_reset = true;
        }
    }
}