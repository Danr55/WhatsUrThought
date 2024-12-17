import { Request, Response } from "express";
import { Thought } from "../models/thought.js";
import { User } from "../models/user.js";

export const getThoughts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { thoughtId } = req.params;

    // Find the thought by ID
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }

    res.status(200).json(thought);
  } catch (err: any) {
    res.status(500).json({ message: "Error fetching thought", error: err });
  }
};


export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const { thoughtText, username, userId } = req.body;

    // Step 1: Create a new thought
    const newThought = await Thought.create({ thoughtText, username });

    // Step 2: Update the associated user's thoughts array
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(201).json({ message: "Thought created and added to user", newThought });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Failed to create thought", error: err.message });
  }
};

export const addReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true, runValidators: true }
    );

    if (!thought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }

    res.json({ message: "Reaction added successfully", thought });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

  export const addThoughtToUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const { thoughtText } = req.body;
  
      // Create the thought
      const newThought = await Thought.create({ thoughtText, username: userId });
  
      // Update the user's thoughts array
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { thoughts: newThought._id } },
        { new: true, runValidators: true }
      ).populate("thoughts");
  
      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      res.status(200).json({ message: "Thought added successfully", thought: newThought });
    } catch (err: any) {
      res.status(500).json({ message: "Failed to add thought", error: err.message });
    }
  };

  export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { thoughtId, reactionId } = req.params;
  
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId } } }, // Pull reaction by _id
        { new: true }
      );
  
      if (!thought) {
        res.status(404).json({ message: "Thought not found" });
        return;
      }
  
      res.json({ message: "Reaction removed successfully", thought });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };