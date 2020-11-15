import { CanvasView } from "../../../tools/abstract/mvc/CanvasView";
import { View } from "../../../tools/abstract/mvc/View";
import { Color } from "../../../tools/data/Color";
import { ViewProperty } from "../../../tools/signals/ChainProperty";
import { Game } from "../../base/Game";
import { consts } from "../../consts/Colors";
import { ViewCollection } from "../ViewCollection";


export class MainView extends CanvasView<ViewCollection> {
    public bg_color = new ViewProperty<this, Color>(this, consts.Colors.BLACK);
    public fg_color = new ViewProperty<this, Color>(this, consts.Colors.WHITE);

    public draw(): void {

    }

}