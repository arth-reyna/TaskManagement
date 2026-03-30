import express from "express";
import {
  dashboard,
  deleteTask,
  getTasks,
  postTask,
  toggleTaskStatus,
  updateTask,
} from "../controller/task.management.js";
import { login, register } from "../controller/auth.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/tasks", authMiddleware, getTasks);
router.post("/tasks", authMiddleware, postTask);
router.delete("/task/:id", authMiddleware, deleteTask);
router.patch("/task/:id", authMiddleware, toggleTaskStatus);
router.put("/task/:id", authMiddleware, updateTask);
router.post("/login", login);
router.post("/register", register);
router.get("/overview", authMiddleware, dashboard);

export default router;
