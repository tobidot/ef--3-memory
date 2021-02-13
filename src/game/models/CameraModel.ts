import { Model } from "@game.object/ts-game-toolbox/src/abstract/mvc/models/Model";
import { Rect } from "@game.object/ts-game-toolbox/src/geometries/Rect";
import { Vector2, Vector2I } from "@game.object/ts-game-toolbox/src/geometries/Vector2";
import { assert_never } from "../../tools/helper";
import { ModelCollection } from "./ModelCollection";

export class CameraModel extends Model<ModelCollection>{
    // Center of the camera
    public center = new Vector2(0, 0);

    /**
     * 
     * @param shape 
     *  The object to map to the "camera"-coordinates
     * @return 
     *  The transformed object
     */
    public reverse_transform(shape: Rect): Rect;
    public reverse_transform(shape: Vector2): Vector2;
    public reverse_transform(shape: Vector2 | Rect): Vector2 | Rect {
        if (shape instanceof Rect) return this.reverse_transform_rect(shape);
        if (shape instanceof Vector2) return this.reverse_transform_vector_2(shape);
        return assert_never(shape);
    }

    /**
     * 
     * @param shape 
     *  The object to map to the "world"-coordinates
     * @return 
     *  The transformed object
     */
    public transform(shape: Rect): Rect;
    public transform(shape: Vector2): Vector2;
    public transform(shape: Vector2 | Rect): Vector2 | Rect {
        if (shape instanceof Rect) return this.transform_rect(shape);
        if (shape instanceof Vector2) return this.transform_vector_2(shape);
        return assert_never(shape);
    }

    public reverse_transform_vector_2(vector2: Vector2): Vector2 {
        return vector2.sub(this.center);
    }

    public reverse_transform_rect(rect: Rect): Rect {
        rect.x -= this.center.x;
        rect.y -= this.center.y;
        return rect;
    }

    public transform_vector_2(vector2: Vector2): Vector2 {
        return vector2.add(this.center);
    }

    public transform_rect(rect: Rect): Rect {
        rect.x += this.center.x;
        rect.y += this.center.y;
        return rect;
    }

}