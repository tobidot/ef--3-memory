import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { ModelCollection } from "./ModelCollection";
import { Vector2 } from "@game.object/ts-game-toolbox/dist/src/geometries/Vector2";
import { RgbColor } from "@game.object/ts-game-toolbox/dist/src/data/RgbColor";
import { PhysicsAdaptable } from "./model-adapters/PhysicsModelAdapter";

export class StarModel extends Model<ModelCollection> implements PhysicsAdaptable {
    public position: Vector2 = new Vector2(0, 0);
    public z: number = 0;
    public color: RgbColor = new RgbColor(255, 255, 255);
    public size: number = 1;
}