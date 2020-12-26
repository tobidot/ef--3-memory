import {Model} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import {ModelTable} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ModelTable";
import {Vector2} from "../../tools/data/Vector2"
import {ModelCollection} from "./ModelCollection";


export class PlanetModel extends Model<ModelCollection> {
    // Properties
    public gravity: number = 1;
    public radius: number = 150;
    public is_deadly : boolean = true;
    public image_name :string ="none";
    // states
    public position: Vector2 = new Vector2();
    public radial_distance: number = 0;
    public radial_position: number = 0;
    public radial_velocity: number = 0;

    public update(delta_seconds: number) {
    }

    public get image(): HTMLImageElement |null{
        const image = this.models.images.all().find((image)=>{
            return image.name === this.image_name;
        });
        if(!image) return null;
        return image.image;
    }

    public static create_planet(table: ModelTable<ModelCollection, PlanetModel>) {
        const planet = table.insert_new();
        planet.position.set(0, 0);
        planet.radius = 85 + Math.random() * 20;
        planet.gravity = 0.9 + Math.random() * 0.2;
        planet.is_deadly = false;
        planet.image_name = "planet";
        return planet;
    }

    public static create_moon(table: ModelTable<ModelCollection, PlanetModel>) {
        const planet = table.insert_new();
        planet.radial_distance = 250 + Math.random() * 100;
        planet.radial_position = Math.random() * Math.PI * 2;
        planet.radial_velocity = 0.05 + Math.random() * Math.random() * Math.PI / 2;
        planet.position = Vector2.from_angle(planet.radial_position, planet.radial_distance);
        planet.radius = 20 + Math.random() * 10;
        planet.gravity = 0.1 + Math.random() * 0.1;
        planet.image_name = "moon";
        return planet;
    }
}