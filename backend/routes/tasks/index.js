import express from "express";
import {
  getTasks,
  postTask,
  deleteTask,
  toggleTaskStatus,
  updateTask,
} from "../../controller/task.management.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, postTask);
router.delete("/:id", authMiddleware, deleteTask);
router.patch("/:id", authMiddleware, toggleTaskStatus);
router.put("/:id", authMiddleware, updateTask);

export default router;
