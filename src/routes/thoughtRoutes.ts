import { Router } from "express";
import { getThoughts, createThought, addReaction, addThoughtToUser, removeReaction, getThoughtById } from "../controllers/thoughtController.js";


const router = Router();

router.get("/", getThoughts);
router.get("/:thoughtId", getThoughtById);
router.post("/", createThought);
router.post("/:thoughtId/reactions", addReaction);
router.post("/:userId", addThoughtToUser);
router.delete("/:thoughtId/reactions/:reactionId", removeReaction);

export default router;