import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { Rect } from "../../tools/data/Rect";
import { GamePhysicsModel } from "./GamePhysicsModel";
import { ModelCollection } from "./ModelCollection";

export class CameraModel extends Model<ModelCollection> {
    public area: Rect = new Rect(0, 0, 800, 600);
    public target: Rect = new Rect(0, 0, 800, 600);

    public update(physics_model: GamePhysicsModel, delta_seconds: number) {
        this.target = physics_model.players_enclosing_rect;
        this.area.lerp(this.target, delta_seconds * 2);
    }

}