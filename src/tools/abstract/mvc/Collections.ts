import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import { Collection } from "../../trees/Collection";
import { Controller, ControllerInterface } from "./Controller";
import { View, ViewInterface } from "./View";

export interface ModelCollectionBase extends Collection<Model> { }
export interface ViewCollectionBase extends Collection<ViewInterface> { }
export interface ControllerCollectionBase extends Collection<ControllerInterface> { }