// In-memory task storage
let tasks = [];
let lastId = 0;

class Task {
  /**
   * Get all tasks
   * @returns {Array} Array of all tasks
   */
  static getAll() {
    return tasks;
  }

  /**
   * Find a task by ID
   * @param {string} id - Task ID
   * @returns {Object|null} Task object or null if not found
   */
  static findById(id) {
    return tasks.find((task) => task.id.toString() === id.toString()) || null;
  }

  /**
   * Create a new task
   * @param {Object} taskData - Task data
   * @returns {Object} Created task
   */
  static create(taskData) {
    const id = ++lastId;
    const newTask = {
      id,
      title: taskData.title,
      description: taskData.description,
      completed: taskData.completed || false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    return newTask;
  }

  /**
   * Update an existing task
   * @param {string} id - Task ID
   * @param {Object} updateData - Data to update
   * @returns {Object} Updated task
   */
  static update(id, updateData) {
    const index = tasks.findIndex(
      (task) => task.id.toString() === id.toString(),
    );

    if (index !== -1) {
      // Update only provided fields
      tasks[index] = {
        ...tasks[index],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };

      return tasks[index];
    }

    return null;
  }

  /**
   * Delete a task
   * @param {string} id  
   * @returns {boolean}  
   */
  static delete(id) {
    const initialLength = tasks.length;
    tasks = tasks.filter((task) => task.id.toString() !== id.toString());

    return tasks.length !== initialLength;
  }

  /**
   * Reset all tasks (for testing)
   */
  static reset() {
    tasks = [];
    lastId = 0;
  }
}

// Add some initial example tasks
Task.create({
  title: "Learn Node.js",
  description: "Study RESTful API development with Express",
  completed: true,
});

Task.create({
  title: "Build a Task API",
  description: "Create a basic task management API with CRUD operations",
  completed: false,
});

Task.create({
  title: "Write documentation",
  description: "Create clear documentation for the API",
  completed: false,
});

module.exports = Task;
