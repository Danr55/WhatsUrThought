import { Request, Response } from "express";
import { User } from "../models/user.js";
import { Thought } from "../models/thought.js";

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().populate("thoughts").populate("friends");
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, friendId } = req.params;

    // Add friendId to user's friends array
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } }, // $addToSet prevents duplicate entries
      { new: true }
    ).populate("friends");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ message: "Friend added successfully", user });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, friendId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } }, // $pull removes friendId from array
      { new: true }
    ).populate("friends");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ message: "Friend removed successfully", user });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Delete all thoughts associated with the user
    await Thought.deleteMany({ username: user.username });

    res.json({ message: "User and associated thoughts deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};