import { Vector2 } from "@game.object/ts-game-toolbox/dist/src/geometries/Vector2";
import { Game } from "../../base/Game";

export interface ExampleAdaptable {
}

export class ExampleModelAdapter {
    protected constructor(public target: ExampleAdaptable) {
    }

    /**
     * Static Functions
     */
    private static instance?: ExampleModelAdapter;

    public static for(target: ExampleAdaptable): ExampleModelAdapter {
        if (!ExampleModelAdapter.instance) {
            ExampleModelAdapter.instance = new ExampleModelAdapter(target);
        }
        ExampleModelAdapter.instance.target = target;
        return ExampleModelAdapter.instance;
    }
}