import { tools } from "@game.object/ts-game-toolbox";
import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { ModelTable } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ModelTable";
import { Vector2 } from "../../tools/data/Vector2"
import { ModelCollection } from "./ModelCollection";
import { ObjectModel } from "./ObjectModel";


export class PlanetModel extends Model<ModelCollection> {
    public position: Vector2 = new Vector2();
    public radius: number = 150;
    public gravity: number = 1;

    public update(delta_seconds: number) {
    }

    public static create_planet(table: ModelTable<ModelCollection, PlanetModel>) {
        const planet = table.insert_new();
        planet.position.set(0, 0);
        planet.radius = 150 + Math.random() * 100;
        planet.gravity = 0.9 + Math.random() * 0.2;
        return planet;
    }

    public static create_moon(table: ModelTable<ModelCollection, PlanetModel>) {
        const planet = table.insert_new();
        planet.position = Vector2.from_angle(Math.random() * Math.PI * 2, 300 + Math.random() * 300);
        planet.radius = 50 + Math.random() * 40;
        planet.gravity = 0.1 + Math.random() * 0.1;
        return planet;
    }
}