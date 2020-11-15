import { Game } from "../base/Game";
import { InfoView } from "./main/InfoView";
import { MainView } from "./main/MainView";

export var views = {
    main: new MainView,
    info: new InfoView,
    partials: {
    }
};

export function create_views(game: Game) {
    return {
        main: new MainView(game),
        info: new InfoView(game),
        partials: {
        }
    };
}