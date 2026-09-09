import express from "express";
import {
  createMessage,
  getMessagesByConversation,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createMessage);
router.get("/:conversationId", getMessagesByConversation);

export default router;
