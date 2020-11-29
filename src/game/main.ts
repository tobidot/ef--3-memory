import { Shared } from "../shared/Shared";
import { Game } from "./base/Game";

export function load_game() {
    let innerContainer = document.createElement('div');
    connect_container_to_game_screen(innerContainer);
}

function connect_container_to_game_screen(container: HTMLDivElement) {
    let shared = Shared.get_instance();
    let game: Game | null = null;
    shared.game_screen_container.add((signal) => {
        console.log('Container Loaded');
        if (signal.new === null) {
        } else {
            if (!game) game = start_game();
        }
    });
}

function start_game(): Game {
    let game: Game = new Game();
    let now = performance.now();
    let animation_frame = (timestamp: number) => {
        const delta_ms = 166; (timestamp - now);
        game.update(delta_ms / 1000);
        now = timestamp;
        game.draw();
        requestAnimationFrame(animation_frame);
    }
    requestAnimationFrame(animation_frame);
    return game;
} 