import {Model} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import {ModelTable} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ModelTable";
import {Vector2} from "../../tools/data/Vector2"
import {ModelCollection} from "./ModelCollection";


export class PlanetModel extends Model<ModelCollection> {
    // Properties
    public gravity: number = 1;
    public radius: number = 150;
    public is_deadly : boolean = true;
    // states
    public position: Vector2 = new Vector2();
    public radial_distance: number = 0;
    public radial_position: number = 0;
    public radial_velocity: number = 0;

    public update(delta_seconds: number) {
    }

    public static create_planet(table: ModelTable<ModelCollection, PlanetModel>) {
        const planet = table.insert_new();
        planet.position.set(0, 0);
        planet.radius = 150 + Math.random() * 100;
        planet.gravity = 0.9 + Math.random() * 0.2;
        planet.is_deadly = false;
        return planet;
    }

    public static create_moon(table: ModelTable<ModelCollection, PlanetModel>) {
        const planet = table.insert_new();
        planet.radial_distance = 300 + Math.random() * 300;
        planet.radial_position = Math.random() * Math.PI * 2;
        planet.radial_velocity = Math.random() * Math.random() * Math.PI / 2;
        planet.position = Vector2.from_angle(planet.radial_position, planet.radial_distance);
        planet.radius = 50 + Math.random() * 40;
        planet.gravity = 0.1 + Math.random() * 0.1;
        return planet;
    }
}