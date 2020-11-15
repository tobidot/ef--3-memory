import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import { Collection } from "../../trees/Collection";
import { Controller, ControllerInterface } from "./Controller";
import { View, ViewInterface } from "./View";

export interface ModelCollection extends Collection<Model> { }
export interface ViewCollection extends Collection<ViewInterface> { }
export interface ControllerCollection extends Collection<ControllerInterface> { }