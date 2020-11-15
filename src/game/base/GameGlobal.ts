import { ControllerCollection } from "../../tools/abstract/mvc/Collections";

export interface GameGlobal {
    ingame_time_in_seconds: number,
    controllers: ControllerCollection,
    models: ModelCollection,
    views: ViewCollection,
}