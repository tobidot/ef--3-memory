import {GameModel} from "./GameModel";
import {Vector2I} from "../../tools/data/Vector2";
import {ModelTable} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ModelTable";
import {ModelCollection} from "./ModelCollection";
import {Rect} from "../../tools/data/Rect";
import {Model} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";

export class GraphicEffectModel extends Model<ModelCollection> {
    public image_name: string = "none";
    public target: Rect = new Rect(0, 0, 25, 25);
    public is_finished: boolean = false;
    public time: number = 0;
    public finish_time: number = 1;
    public fade_out_time: number = 0.5;

    public update(delta_seconds: number) {
        this.time += delta_seconds;
        if (this.time > this.finish_time) {
            this.is_finished = true;
        }
    }

    public get image(): HTMLImageElement | null {
        const image = this.models.images.all().find((image) => image.name === this.image_name);
        if (image) return image.image;
        return null;
    }

    public get fading_progress(): number {
        if (this.finish_time <= this.fade_out_time)  return 0;
        return Math.min(1, Math.max(0, (this.time- this.fade_out_time) / (this.finish_time - this.fade_out_time)));
    }

    public static create_explosion(table: ModelTable<ModelCollection, GraphicEffectModel>, position: Vector2I): GraphicEffectModel {
        const model = table.insert_new();
        model.target.set_center(position);
        model.image_name = "red-dot";
        model.fade_out_time = 0.5;
        model.finish_time=1;
        return model;
    }
}