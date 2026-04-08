import { verify } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token not present",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await verify(token);
    req.userId = decoded.id;

    next();
  } catch (error) {
    next(error);
  }
};
