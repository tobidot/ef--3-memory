import { ViewCollectionBase } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Collections";
import { MainView } from "./main/MainView";

export interface ViewCollection extends ViewCollectionBase {
    main: MainView,
    partials: {
    }
}

export function create_views(canvas: HTMLCanvasElement): ViewCollection {
    const collection: ViewCollection = {} as ViewCollection;
    const main = new MainView(canvas, collection);
    return Object.assign(collection, {
        main,
        partials: {
        }
    });
}