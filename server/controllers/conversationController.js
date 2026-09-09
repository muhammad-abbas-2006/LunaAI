import mongoose from "mongoose";
import Conversation from "../models/conversationModel.js";

const createConversation = async (req, res) => {
  try {
    const { title } = req.body;

    const conversation = await Conversation.create({
      userId: req.user,
      title: title?.trim() || "New Chat",
    });

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      userId: req.user,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getConversationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID",
      });
    }

    const conversation = await Conversation.findOne({
      _id: id,
      userId: req.user,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversation ID",
      });
    }

    const conversation = await Conversation.findOneAndDelete({
      _id: id,
      userId: req.user,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found or not owned by user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createConversation,
  getConversations,
  getConversationById,
  deleteConversation,
};
