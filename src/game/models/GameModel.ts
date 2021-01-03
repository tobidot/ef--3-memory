import {Model} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import {ModelCollection} from "./ModelCollection";
import {PhysicsModelAdapter} from "./model-adapters/PhysicsModelAdapter";

export class GameModel extends Model<ModelCollection> {
    public update(delta_seconds: number) {
        this.models.stars.for_each((star) => {
            PhysicsModelAdapter.for(star).update(delta_seconds);
        });
    }
}