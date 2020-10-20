import { GameModel } from "../models/GameModel";
import { PlayerModel } from "../models/PlayerModel";
import { WordModel } from "../models/WordModel";

export class ModelCollection {
    public game: GameModel = new GameModel;
    public player: PlayerModel = new PlayerModel;
    public word: WordModel = new WordModel;
}