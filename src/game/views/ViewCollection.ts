import p5 from "p5";
import { ViewCollection } from "../../tools/abstract/mvc/Collections";
import { InfoView } from "./main/InfoView";
import { MainView } from "./main/MainView";
import { HangedManView } from "./partials/HangedManView";
import { WordView } from "./partials/WordView";

export var views = {
    main: new MainView,
    info: new InfoView,
    partials: {
        hanged_man: new HangedManView,
        word: new WordView,
    }
};