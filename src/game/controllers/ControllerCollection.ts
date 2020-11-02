import { ControllerCollection } from "../../tools/abstract/mvc/Collections";
import { GameController } from "./GameController";
import { InputController } from "./InputController";

export var controllers = {
    game_controller: new GameController,
    input_controller: new InputController,
};