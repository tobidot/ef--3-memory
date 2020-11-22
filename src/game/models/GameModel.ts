import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { ModelCollection } from "./ModelCollection";


interface Strike {
    type: "X" | "O";
    count: number;
};
export class GameModel extends Model<ModelCollection> {

    public constructor() {
        super();
        this.reset();
    }

    public update(delta_seconds: number) {
    }

    public reset() {

    }
}