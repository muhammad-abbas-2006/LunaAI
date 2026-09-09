import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const user = await User.findById(decoded.userId).select("_id");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found for provided token",
      });
    }

    req.user = user._id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }
};

export { protect };
