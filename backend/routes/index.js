import express from 'express';
import { deleteTask, getTasks, postTask, toggleTaskStatus, updateTask } from "../controller/task.management.js"

const router = express.Router();

router.get("/tasks", getTasks);
router.post("/tasks", postTask);
router.delete('/task/:id', deleteTask);
router.patch('/task/:id', toggleTaskStatus);
router.put('/task/:id', updateTask);

export default router;