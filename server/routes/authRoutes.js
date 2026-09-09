import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  changePassword,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.put("/change-password", protect, changePassword);

export default router;
