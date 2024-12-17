import { Router } from "express";
import { getUsers, createUser, deleteUser, addFriend, removeFriend } from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:userId", deleteUser);
router.post("/:userId/friends/:friendId", addFriend);
router.delete("/:userId/friends/:friendId", removeFriend);

export default router;