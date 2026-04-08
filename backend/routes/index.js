import express from "express";
import authRoutes from "./auth/index.js";
import taskRoutes from "./tasks/index.js";
import { dashboard } from "../controller/task.management.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.get("/overview", authMiddleware, dashboard);

export default router;
