import { Request, Response } from "express";
import { Thought } from "../models/thought.js";

export const getThoughts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.create(req.body);
    res.json(thought);
  } catch (err : any) {
    res.status(500).json({ message: err.message });
  }
};

export const addReaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { thoughtId } = req.params;
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!thought) {
        res.status(404).json({ message: "Thought not found" });
        return;
      }
      res.json(thought);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };