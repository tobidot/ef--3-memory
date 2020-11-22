import { Controller } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ModelCollection } from "../models/ModelCollection";
import { ViewCollection } from "../views/ViewCollection";
import { ControllerCollection } from "./ControllerCollection";

export class BaseController extends Controller<ModelCollection, ViewCollection, ControllerCollection> {

}
