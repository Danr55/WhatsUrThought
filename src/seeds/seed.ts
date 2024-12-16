import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.js";
import { Thought } from "../models/thought.js";

dotenv.config();

const seedDatabase = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/socialNetworkDB", {
    });
    console.log("MongoDB connected");

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log("Existing data cleared");

    // Seed users
    const users = [
      { username: "JohnDoe", email: "john.doe@example.com" },
      { username: "JaneSmith", email: "jane.smith@example.com" },
      { username: "AliceWonderland", email: "alice.wonderland@example.com" },
    ];

    const createdUsers = await User.insertMany(users);
    console.log("Users seeded:", createdUsers);

    // Seed thoughts
    const thoughts = [
      { thoughtText: "This is John's first thought.", username: createdUsers[0].username },
      { thoughtText: "Jane's thinking about the universe.", username: createdUsers[1].username },
      { thoughtText: "Alice's thought: What is real?", username: createdUsers[2].username },
    ];

    const createdThoughts = await Thought.insertMany(thoughts);
    console.log("Thoughts seeded:", createdThoughts);

    // Associate thoughts with users
    const updates = createdUsers.map((user, index) => {
      const thought = createdThoughts[index];
      return User.findByIdAndUpdate(
        user._id,
        { $push: { thoughts: thought._id } }, // Use $push to update thoughts
        { new: true } // Return the updated document
      );
    });

    await Promise.all(updates);
    console.log("Users updated with thoughts");

    // Exit process
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDatabase();