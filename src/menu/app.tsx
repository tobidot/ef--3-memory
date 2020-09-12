import * as React from "react";
import ReactDOM, { render } from "react-dom";
import { Application } from "./components/Application";

import 'semantic-ui-css/semantic.min.css'
import { ApplicationWindowItem } from "./data/ApplicationTabItem";
import { ApplicationMenuState } from "./data/GameMenuState";
import { MainMenu } from "./components/MainMenu";
import { Shared } from "../shared/Shared";
import { GameScreen } from "./components/GameScreen";

export function load_menu() {
    let app = document.getElementById('app');
    let shared = Shared.get_instance();
    let windows: Array<ApplicationWindowItem<ApplicationMenuState>> = [
        {
            state: ApplicationMenuState.MAIN,
            tab: <div>Menu</div>,
            content: <MainMenu shared={shared} />,
        },
        {
            state: ApplicationMenuState.GAME,
            tab: <div>Game</div>,
            content: <GameScreen container={shared.game_screen_container} />,
        },
    ];
    ReactDOM.render(<Application<ApplicationMenuState>
        startState={ApplicationMenuState.MAIN}
        windowItems={windows}
    />, app);
}

