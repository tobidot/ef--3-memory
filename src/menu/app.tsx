import * as React from "react";
import ReactDOM from "react-dom";
import { Application } from "./components/Application";

import 'semantic-ui-css/semantic.min.css'
import { ApplicationMenuState } from "./data/GameMenuState";
import { Shared } from "../shared/Shared";

export function load_menu() {
    let app = document.getElementById('app');
    let shared = Shared.get_instance();
    ReactDOM.render(<Application
        startState={ApplicationMenuState.MAIN}
    />, app);
}

