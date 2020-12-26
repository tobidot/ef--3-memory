import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { ObservableSocket } from "@game.object/ts-game-toolbox/dist/src/signals/ObservableSocket";
import { UserInput } from "./helpers/input/ActionTypes";
import { ModelCollection } from "./ModelCollection";
import { ObjectModel } from "./ObjectModel";
import { PlanetModel } from "./PlanetModel";
import {Vector2} from "../../tools/data/Vector2";

export class GameModel extends Model<ModelCollection> {
    public round:number = 1;
    public round_timer:number = 0;
    public remaining_spawns: number = 1;
    public current_time_to_spawn: number = 1;
    public cooldown_to_spawn: number = 1;

    public enemies_left:number = 0;

    public update(delta_seconds: number) {
        this.round_timer+=delta_seconds;

        const moon = this.models.planets.all()[1];
        moon.radial_position += moon.radial_velocity * delta_seconds;
        moon.position.set(Vector2.from_angle(moon.radial_position, moon.radial_distance));

        this.current_time_to_spawn -= delta_seconds;
        if (this.current_time_to_spawn < 0 && this.remaining_spawns > 0) {
            this.current_time_to_spawn = this.cooldown_to_spawn;
            this.remaining_spawns--;
            ObjectModel.create_enemy(this.models.objects, this.models.planets.all()[0]);
        }
        this.enemies_left = this.models.objects.all().filter((object)=>{
            return object.is_enemy;
        }).length;
        if (this.enemies_left=== 0 && this.remaining_spawns === 0){
            this.round++;
            this.round_timer=0;
            this.remaining_spawns = this.round;
            this.current_time_to_spawn = this.cooldown_to_spawn;
        }



        const to_delete_effects = this.models.graphic_effects.all().filter((effect)=>{
             effect.update(delta_seconds);
             return effect.is_finished;
        });
        to_delete_effects.forEach((effect)=>{
            this.models.graphic_effects.delete(effect);
        });


        delta_seconds /= 10;
        for (let i = 0; i < 10; ++i) {

            this.models.physics.update(delta_seconds);
            this.update_objects(delta_seconds);
            this.rotate_objects_to_planet();
            this.models.physics.resolve(delta_seconds);
        }

    }

    public update_objects(delta_seconds: number) {
        const to_delete = this.models.objects.all().filter((object) => {
            object.update(delta_seconds);
            if (object.require_reset) {
                object.require_reset = false;
                object.position.set(Vector2.from_angle(Math.random()*Math.PI*2, this.models.planets.all()[0].radius));
                object.velocity.set(0,0);
                object.action_script = null;
            }
            return object.is_dying;
        });
        to_delete.forEach((object)=>{
            this.models.objects.delete(object);
        });
    }

    public rotate_objects_to_planet() {
        const center = this.models.planets.all()[0].position;
        this.models.objects.map((object: ObjectModel) => {
            object.physics.rotate_to_center(center);
            return object;
        })
    }

    public input_player(action: UserInput) {
        this.models.objects.map((player: ObjectModel) => {
            if (!player.is_user_controlled) return player;
            player.controllable.handle_input(action);
            return player;
        });
    }
}