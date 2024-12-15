import { Schema, model } from "mongoose";
import { IUser } from "../types/IUser";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, match: [/^.+@.+\..+$/, "Invalid email format"] },
  thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const User = model<IUser>("User", userSchema);