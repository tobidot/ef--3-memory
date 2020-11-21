import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/ModelViewComposer";
import { CollectionTree } from "../../trees/Collection";
import { ControllerInterface } from "./Controller";
import { ViewInterface } from "./View";

export interface ModelCollectionBase extends CollectionTree<Model> { }
export interface ViewCollectionBase extends CollectionTree<ViewInterface> { }
export interface ControllerCollectionBase extends CollectionTree<ControllerInterface> { }