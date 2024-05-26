import mongoose from "mongoose";
import { IUser } from "./User";

const Schema = mongoose.Schema;

export interface IGamePlayer {
  playerNumber: number;
  player: IUser;
}

const gamePlayerSchema = new Schema(
  {
    playerNumber: { type: Number, required: false },
    player: { type: Schema.ObjectId, ref: "User" },
  },
  {
    collection: "GamePlayer",
  }
);

export default mongoose.model<IGamePlayer>("GamePlayer", gamePlayerSchema);
