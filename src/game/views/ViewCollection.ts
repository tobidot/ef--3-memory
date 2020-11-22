import { ViewCollectionBase } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Collections";
import { InfoView } from "./main/InfoView";
import { MainView } from "./main/MainView";

export interface ViewCollection extends ViewCollectionBase {
    main: MainView,
    info: InfoView,
    partials: {
    }
};

export function create_views(canvas: HTMLCanvasElement): ViewCollection {
    const collection: ViewCollection = {} as ViewCollection;
    return Object.assign(collection, {
        main: new MainView(canvas, collection),
        info: new InfoView(canvas, collection),
        partials: {
        }
    });
}