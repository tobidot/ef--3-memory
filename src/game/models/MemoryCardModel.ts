import { tools } from "@game.object/ts-game-toolbox";
import { Model } from "@game.object/ts-game-toolbox/src/abstract/mvc/models/Model";
import { Rect } from "@game.object/ts-game-toolbox/src/geometries/Rect";
import { RgbColor } from "@game.object/ts-game-toolbox/src/data/RgbColor";
import { UserInterfaceAdaptable } from "./model-adapters/UserInterfaceModelAdapter";
import { ModelCollection } from "./ModelCollection";

export class MemoryCardModel extends Model<ModelCollection> implements UserInterfaceAdaptable {
    public color: RgbColor = tools.commons.Colors.WHITE;
    public is_revealed: boolean = false;
    public is_drawn: boolean = false;

    public collider: Rect = new Rect(0, 0, 0, 0);

    public is_pair(other: MemoryCardModel): boolean {
        return other.color === this.color && this !== other;
    }

    public get is_clickable(): boolean {
        return !this.is_revealed && !this.is_drawn;
    }
}