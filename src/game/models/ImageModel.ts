import {GameModel} from "./GameModel";
import {ModelTable} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ModelTable";
import {ModelCollection} from "./ModelCollection";
import {Model} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";

const image_assets = require('../../assets/images/*.svg');

export class ImageModel extends Model<ModelCollection> {
    public name: string = "none";
    public image: HTMLImageElement | null = null;

    public static create_image(table: ModelTable<ModelCollection, ImageModel>, name: string, file: string): ImageModel {
        const model = table.insert_new();
        model.name = name;
        const file_hash = image_assets[file];
        if (!file_hash) return model;
        const image = new Image;
        image.addEventListener('load', () => {
            model.image = image;
            console.log('file floaded');
        });
        image.addEventListener('error', ()=>{
            console.log('file failed');
            debugger;
        });
        image.src = file_hash;
        return model;
    }
}