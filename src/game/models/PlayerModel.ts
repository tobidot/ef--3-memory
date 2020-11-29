import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { Vector } from "p5";
import { Vector2 } from "../../tools/data/Vector2";
import { ModelCollection } from "./ModelCollection";

export class PlayerModel extends Model<ModelCollection> {
    public position: Vector2 = new Vector2;
    public velocity: Vector2 = new Vector2;
    public rotation: number = 0;
    public is_grounded: boolean = false;
    public energy: number = 2;

    public update(delta_seconds: number) {
        this.position.x += this.velocity.x * delta_seconds;
        this.position.y += this.velocity.y * delta_seconds;
        this.velocity.mul(this.is_grounded ? 0.999 : 0.9);
        this.energy += delta_seconds;
    }

    public rotate_to_center(center: Vector2) {
        this.rotation = this.position.cpy().sub(center).get_angle();
    }

    public accelerate(direction: Readonly<Vector2>) {
        this.velocity.add(direction.cpy().rotate_radians_clockwise(this.rotation));
    }

    public self_accelerate(direction: Readonly<Vector2>, delta_seconds: number) {
        if (this.is_grounded) {
            this.accelerate(direction.cpy().mul(delta_seconds * 400));
        } else {
            this.accelerate(direction.cpy().mul(delta_seconds * 50));
        }
    }
}