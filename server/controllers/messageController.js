import mongoose from "mongoose";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

const createMessage = async (req, res) => {
  try {
    const { conversationId, role, content } = req.body;

    if (!conversationId || !role || !content) {
      return res.status(400).json({
        success: false,
        message: "conversationId, role, and content are required",
      });
    }

    if (!mongoose.isValidObjectId(conversationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID",
      });
    }

    if (!["user", "assistant"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be either 'user' or 'assistant'",
      });
    }

    const conversation = await Conversation.findOne({
      _id: conversationId,
      userId: req.user,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found or not owned by user",
      });
    }

    const message = await Message.create({
      conversationId,
      role,
      content: content.trim(),
    });

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMessagesByConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    if (!mongoose.isValidObjectId(conversationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID",
      });
    }

    const conversation = await Conversation.findOne({
      _id: conversationId,
      userId: req.user,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found or not owned by user",
      });
    }

    const messages = await Message.find({
      conversationId,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createMessage, getMessagesByConversation };
