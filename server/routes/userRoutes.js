import express from "express";
import {
  getUsers,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
