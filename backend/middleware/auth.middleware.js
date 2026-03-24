import { verify } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not present",
      });
    }

    const decoded = await verify(token);
    req.userId = decoded.id;
    next();
  } catch (error) {
    throw new Error({
      message: "Invalid or Expired Token",
      error: error,
    });
  }
};
