import { Schema, model } from "mongoose";
import { IThought } from "../types/IThought";

const thoughtSchema = new Schema<IThought>({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  reactions: [
    {
      reactionBody: { type: String, required: true, maxlength: 280 },
      username: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export const Thought = model<IThought>("Thought", thoughtSchema);