import { Controller } from "@game.object/ts-game-toolbox/src/abstract/mvc/controllers/Controller";
import { ModelCollection } from "../models/ModelCollection";
import { ViewCollection } from "../views/ViewCollection";
import { ControllerCollection } from "./ControllerCollection";

export class BaseController extends Controller<ModelCollection, ViewCollection, ControllerCollection> {

}
