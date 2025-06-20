import express from "express"
import { getAllTask, createTask, getTask, updateTask, deleteTask } from "../controllers/taskController.js"

const router = express.Router()

router.get("/", getAllTask)
router.get("/:id", getTask)
router.post("/", createTask)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)

export default router;

