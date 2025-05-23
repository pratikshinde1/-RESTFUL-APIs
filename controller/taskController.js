const Task = require("../model/taskModel");
const validation = require("../validation");

// GET /tasks - Retrieve all tasks (with optional pagination)
exports.getAllTasks = (req, res) => {
  try {
    // Get pagination parameters from query string
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate pagination values
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const allTasks = Task.getAll();

    // Add pagination metadata
    if (endIndex < allTasks.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    // Paginate the results
    results.totalTasks = allTasks.length;
    results.totalPages = Math.ceil(allTasks.length / limit);
    results.currentPage = page;
    results.tasks = allTasks.slice(startIndex, endIndex);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// GET /tasks/:id - Retrieve a specific task by ID
exports.getTaskById = (req, res) => {
  try {
    const id = req.params.id;
    const task = Task.findById(id);

    if (!task) {
      return res.status(404).json({
        status: "error",
        message: `Task with ID ${id} not found`,
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// POST /tasks - Create a new task
exports.createTask = (req, res) => {
  try {
    const { title, description, completed } = req.body;

    // Validate required fields
    const validationErrors = validation.validateTask({ title, description });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Create the task
    const newTask = Task.create({
      title,
      description,
      completed: completed || false,
    });

    res.status(201).json({
      status: "success",
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// PUT /tasks/:id - Update an existing task
exports.updateTask = (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, completed } = req.body;

    // Check if task exists
    const existingTask = Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({
        status: "error",
        message: `Task with ID ${id} not found`,
      });
    }

    // Validate fields if provided
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;

    // Only validate if fields are being updated
    if (title !== undefined || description !== undefined) {
      const validationErrors = validation.validateTaskUpdate({
        title: title || existingTask.title,
        description: description || existingTask.description,
      });

      if (validationErrors.length > 0) {
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: validationErrors,
        });
      }
    }

    // Update the task
    const updatedTask = Task.update(id, updateData);

    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// DELETE /tasks/:id - Delete a task
exports.deleteTask = (req, res) => {
  try {
    const id = req.params.id;

    // Check if task exists
    const existingTask = Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({
        status: "error",
        message: `Task with ID ${id} not found`,
      });
    }

    // Delete the task
    Task.delete(id);

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
