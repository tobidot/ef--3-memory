import {
    ControllerRouteResponse,
    ControllerRouteResponseType
} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { BaseController } from "./BaseController";
import { RgbColor } from "@game.object/ts-game-toolbox/dist/src/data/RgbColor";
import { StarModel } from "../models/StarModel";

export class GameController extends BaseController {
    public readonly COLOR_COUNT: number = 50;

    /**
     * Start a new game
     */
    public new_game(): ControllerRouteResponse {
        for (let i = 0; i < this.COLOR_COUNT; ++i) {
            let star = this.models.stars.insert_new();
            this.form_star(star);
        }
        const response: ControllerRouteResponseType = {
            view: this.views.main,
            controller: this.controllers.for_event.game_controller,
        };
        return response;
    }

    /**
     * Form a new StarModel
     * @param star the star model to manipulate
     */
    private form_star(star: StarModel) {
        // a random color
        star.color = this.create_star_color();
        // a random value between 0 an 100
        star.z = Math.random() * 100;
        // a random position inside the screen boundries
        star.position.set({
            x: Math.random() * 400 * 2 - 400,
            y: Math.random() * 300 * 2 - 300,
        });
    }

    /**
     * Create a random Color, but it should have a minimum brightness.
     */
    private create_star_color(): RgbColor {
        // define a random intensity, wich has at least above verage brightness
        const intensity = Math.random() * 100 + 155;
        // Add a random value to each color component, to allow slight variations.
        return new RgbColor(
            Math.max(intensity + 50 * Math.random(), 255),
            Math.max(intensity + 50 * Math.random(), 255),
            Math.max(intensity + 50 * Math.random(), 255),
        );
    }
}