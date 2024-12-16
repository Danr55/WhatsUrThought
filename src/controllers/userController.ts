import { Request, Response } from "express";
import { User } from "../models/user.js";

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