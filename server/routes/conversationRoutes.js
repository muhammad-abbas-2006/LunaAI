import express from "express";
import {
  createConversation,
  getConversations,
  getConversationById,
  deleteConversation,
} from "../controllers/conversationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createConversation);
router.get("/", getConversations);
router.get("/:id", getConversationById);
router.delete("/:id", deleteConversation);

export default router;
