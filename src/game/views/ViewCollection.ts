import { ViewCollectionBase } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Collections";
import { DebugPhysicsView } from "./debug/DebugPhysicsView";
import { InfoView } from "./main/InfoView";
import { MainView } from "./main/MainView";

export interface ViewCollection extends ViewCollectionBase {
    main: MainView,
    debug_physics: DebugPhysicsView,
    info: InfoView,
    partials: {
    }
};

export function create_views(canvas: HTMLCanvasElement): ViewCollection {
    const collection: ViewCollection = {} as ViewCollection;
    const debug_physics = new DebugPhysicsView(canvas, collection);
    const main = new MainView(canvas, collection);
    const info = new InfoView(canvas, collection);
    return Object.assign(collection, {
        main,
        info,
        debug_physics,
        partials: {
        }
    });
}