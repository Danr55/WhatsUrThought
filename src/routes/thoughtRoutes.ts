import { Router } from "express";
import { getThoughts, createThought } from "../controllers/thoughtController.js";
import { addReaction } from "../controllers/thoughtController.js";

const router = Router();

router.get("/", getThoughts);
router.post("/", createThought);
router.post("/:thoughtId/reactions", addReaction);

export default router;