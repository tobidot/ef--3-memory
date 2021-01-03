import {Vector2} from "@game.object/ts-game-toolbox/dist/src/geometries/Vector2";
import {Game} from "../../base/Game";

export interface PhysicsAdaptable {
    position: Vector2;
    z: number;
    size: number;
}

export class PhysicsModelAdapter {
    protected constructor(public target: PhysicsAdaptable) {
    }

    public update(delta_seconds: number) {
        this.target.z -= delta_seconds * this.target.size * 20;
        if (this.target.z < 2) this.target.z = 100;
    }

    /**
     * Static Functions
     */
    private static instance?: PhysicsModelAdapter;

    public static for(target: PhysicsAdaptable): PhysicsModelAdapter {
        if (!PhysicsModelAdapter.instance) {
            PhysicsModelAdapter.instance = new PhysicsModelAdapter(target);
        } else {
            PhysicsModelAdapter.instance.target = target;
        }
        return PhysicsModelAdapter.instance;
    }
}