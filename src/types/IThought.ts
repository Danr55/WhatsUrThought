import { Document } from "mongoose";
import { IReaction } from "./IReaction";

export interface IThought extends Document {
  thoughtText: string;
  username: string;
  createdAt: Date;
  reactions: IReaction[];
}