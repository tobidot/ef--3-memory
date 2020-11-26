import { tools } from "@game.object/ts-game-toolbox";
import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { Vector2 } from "../../tools/data/Vector2"
import { ModelCollection } from "./ModelCollection";


export class PlanetModel extends Model<ModelCollection> {
    public position: Vector2 = new Vector2();
    public radius: number = 150;
    public gravity: number = 1;

    public update(delta_seconds: number) {
    }
}