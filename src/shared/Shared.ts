import { Game } from "../game/Game";
import { ObservableSocket } from "@game.object/ts-game-toolbox/dist/src/signals/ObservableSocket";


export class Shared {
    public game = new ObservableSocket<Game | null>(null);
    public game_screen_container = new ObservableSocket<HTMLDivElement | null>(null);

    private static instance: Shared;
    public static get_instance(): Shared { return Shared.instance || (Shared.instance = new Shared()); }
    private constructor() { }
}