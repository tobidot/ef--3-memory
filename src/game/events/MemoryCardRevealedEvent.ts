import { ControllerEvent } from "@game.object/ts-game-toolbox/src/abstract/mvc/events/ControllerEvent";
import { MemoryCardModel } from "../models/MemoryCardModel";

export interface MemoryCardRevealedEvent extends ControllerEvent {
    event_name: "memory-card-revealed-event";
    target: MemoryCardModel;
}

export function is_memory_card_revealed_event(obj: any): obj is MemoryCardRevealedEvent {
    return ("event_name" in obj) && obj.event_name === "memory-card-revealed-event";
}