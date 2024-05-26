import mongoose from "mongoose";
import { IGamePlayer } from "./GamePlayer";

const Schema = mongoose.Schema;

export interface IGame {
  current: boolean;
  gamePlayers: IGamePlayer[];
}

const gameSchema = new Schema(
  {
    current: { type: Boolean, require: true },
    gamePlayers: { type: [Schema.ObjectId], ref: "GamePlayer" },
  },
  {
    collection: "Game",
  }
);

export default mongoose.model<IGame>("Game", gameSchema);
