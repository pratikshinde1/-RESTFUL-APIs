const express = require("express");
const taskController = require("../controller/taskController");

const router = express.Router();

// GET /tasks - Retrieve all tasks (with optional pagination)
router.get("/", taskController.getAllTasks);

// GET /tasks/:id - Retrieve a specific task by ID
router.get("/:id", taskController.getTaskById);

// POST /tasks - Create a new task
router.post("/", taskController.createTask);

// PUT /tasks/:id - Update an existing task
router.put("/:id", taskController.updateTask);

// DELETE /tasks/:id - Delete a task
router.delete("/:id", taskController.deleteTask);

module.exports = router;

