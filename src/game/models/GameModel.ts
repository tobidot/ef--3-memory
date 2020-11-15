import { Model } from "../../tools/abstract/mvc/Model";
import { Game } from "../base/Game";
import { ModelCollection } from "./ModelCollection";

export class GameModel extends Model<ModelCollection> {

    public update(delta_seconds: number) {
    }

    public reset() {

    }
}