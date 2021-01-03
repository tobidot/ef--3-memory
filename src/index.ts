import { load_game } from "./game/main";

(() => {
    const app = document.getElementById('app');
    if (!(app instanceof HTMLDivElement)) throw new Error("Could not locate canvas");
    load_game();
})();