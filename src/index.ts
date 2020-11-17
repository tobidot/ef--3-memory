import { load_game } from "./game/main";
import { Shared } from "./shared/Shared";

(() => {
    load_game();
    const app = document.getElementById('app');
    if (!(app instanceof HTMLDivElement)) throw new Error("Could not locate canvas");
    Shared.get_instance().game_screen_container.set(app);
})();