import { GameController } from "./GameController";
import { InputController as InfoController } from "./InfoController";

export interface ControllerCollection {
    game_controller: GameController,
    info_controller: InfoController,
}

export var controllers: ControllerCollection = {
    game_controller: new GameController,
    info_controller: new InfoController,
};