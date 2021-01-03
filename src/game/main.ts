import { Game } from "./base/Game";

export function load_game() {
    start_game();
}

function start_game(): Game {
    let game: Game = new Game();
    let now = performance.now();
    let animation_frame = (timestamp: number) => {
        const delta_ms = 16; (timestamp - now);
        game.update(delta_ms / 1000);
        now = timestamp;
        game.draw();
        requestAnimationFrame(animation_frame);
    }
    requestAnimationFrame(animation_frame);
    return game;
} 