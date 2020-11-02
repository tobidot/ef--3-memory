import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import { Collection } from "../../trees/Collection";
import { Controller } from "./Controller";
import { View } from "./View";

export interface ModelCollection extends Collection<Model> { }
export interface ViewCollection extends Collection<View> { }
export interface ControllerCollection extends Collection<Controller> { }