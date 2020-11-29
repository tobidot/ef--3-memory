import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { CameraModel } from "./CameraModel";
import { GamePhysicsModel } from "./GamePhysicsModel";
import { ModelCollection } from "./ModelCollection";
import { PlanetModel } from "./PlanetModel";
import { PlayerModel } from "./PlayerModel";


interface Strike {
    type: "X" | "O";
    count: number;
};
export class GameModel extends Model<ModelCollection> {
    public physics: GamePhysicsModel = new GamePhysicsModel();

    public readonly GRAVITY_CONSTANT = 500;
    public planet: PlanetModel = new PlanetModel;
    public moon: PlanetModel = new PlanetModel;
    public players: Array<PlayerModel> = [
        new PlayerModel,
        new PlayerModel,
    ];

    public constructor() {
        super();
        this.reset();
    }

    public reset() {
        this.moon.position.x = 100;
        this.moon.position.y = 400;
        this.moon.radius = 40;
        this.moon.gravity = 0.15;
        this.players[0].position.x = -300;
        this.players[1].position.x = 300;
        this.players[0].velocity.y = -0.25;
    }

    public update(delta_seconds: number) {
        const planets = [this.planet, this.moon];
        this.physics.update(planets, this.players);
        this.players.forEach((player) => {
            player.update(delta_seconds);
            player.rotate_to_center(this.planet.position);
            player.is_grounded = false;
        });
        [this.planet, this.moon].forEach((planet) => this.apply_physics_of_planet_to_players(planet));
    }

    protected apply_physics_of_planet_to_players(planet: PlanetModel) {
        this.players.forEach((player) => {
            const diff = planet.position.cpy().sub(player.position);
            const distance2 = diff.cpy().len2();
            const acceleration = this.GRAVITY_CONSTANT * planet.gravity / distance2;
            player.velocity.x += diff.x * acceleration;
            player.velocity.y += diff.y * acceleration;
            if (distance2 < (planet.radius + 5) * (planet.radius + 5)) {
                const offset = diff.cpy().set_magnitude(planet.radius + 5).mul(-1);
                const orthogonal_counterforce = diff.dot(player.velocity) / diff.len2();
                player.position.set(planet.position.cpy().add(offset));
                player.velocity.add(diff.mul(-1).mul(orthogonal_counterforce));
                player.is_grounded = true;
            }
        });
    }

    protected get_player_deviation() {

    }
}