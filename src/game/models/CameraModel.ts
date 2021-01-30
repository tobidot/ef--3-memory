import { Rect } from "@game.object/ts-game-toolbox/dist/src/geometries/Rect";
import { Vector2, Vector2I } from "@game.object/ts-game-toolbox/dist/src/geometries/Vector2";
import { ChainProperty } from "@game.object/ts-game-toolbox/dist/src/signals/ChainProperty";
import { Model } from "@game.object/ts-game-toolbox/src/abstract/mvc/Model";
import { assert_never } from "../../tools/helper";
import { ModelCollection } from "./ModelCollection";

export class CameraModel extends Model<ModelCollection>{
    public center = new Vector2(0, 0);

    public transform(shape: Rect): Rect;
    public transform(shape: Vector2): Vector2;
    public transform(shape: Vector2 | Rect): Vector2 | Rect {
        if (shape instanceof Rect) return this.transformRect(shape);
        if (shape instanceof Vector2) return this.transformVector2(shape);
        return assert_never(shape);
    }

    public transformVector2(vector2: Vector2): Vector2 {
        return vector2.add(this.center);
    }

    public transformRect(rect: Rect): Rect {
        rect.x += this.center.x;
        rect.y += this.center.y;
        return rect;
    }

}