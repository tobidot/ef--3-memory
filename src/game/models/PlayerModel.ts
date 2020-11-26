import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { Vector2 } from "../../tools/data/Vector2";
import { ModelCollection } from "./ModelCollection";

export class PlayerModel extends Model<ModelCollection> {
    public position: Vector2 = new Vector2;
    public velocity: Vector2 = new Vector2;

    public update(delta_seconds: number) {
        this.position.x += this.velocity.x * delta_seconds;
        this.position.y += this.velocity.y * delta_seconds;
        this.velocity.mul(0.999);
    }
}