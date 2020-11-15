import { ViewCollectionBase } from "../../tools/abstract/mvc/Collections";
import { View } from "../../tools/abstract/mvc/View";
import { Game } from "../base/Game";
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