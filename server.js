const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./errorHandler");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// API routes
app.use("/tasks", taskRoutes);

// API documentation route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Tasks API",
    documentation: {
      endpoints: {
        getTasks:
          "GET /tasks - Get all tasks (supports pagination with ?page=1&limit=10)",
        getTaskById: "GET /tasks/:id - Get a specific task by ID",
        createTask: "POST /tasks - Create a new task",
        updateTask: "PUT /tasks/:id - Update an existing task",
        deleteTask: "DELETE /tasks/:id - Delete a task",
      },
    },
  });
});

// Error handling middleware
app.use(errorHandler);

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}`);
});

module.exports = app; // Export for testing purposes
