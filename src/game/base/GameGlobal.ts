import { ControllerCollectionBase } from "../../tools/abstract/mvc/Collections";
import { ModelCollection } from "../models/ModelCollection";
import { ViewCollection } from "../views/ViewCollection";

export interface GameGlobal {
    ingame_time_in_seconds: number,
    controllers: ControllerCollectionBase,
    models: ModelCollection,
    views: ViewCollection,
}