/**
 * Validates task data for creation
 * @param {Object} taskData - Task data to validate
 * @returns {Array} Array of validation errors
 */
exports.validateTask = (taskData) => {
  const errors = [];

  // Check for required fields
  if (!taskData.title) {
    errors.push("Title is required");
  } else if (taskData.title.trim() === "") {
    errors.push("Title cannot be empty");
  } else if (taskData.title.length > 100) {
    errors.push("Title cannot exceed 100 characters");
  }

  if (!taskData.description) {
    errors.push("Description is required");
  } else if (taskData.description.trim() === "") {
    errors.push("Description cannot be empty");
  } else if (taskData.description.length > 500) {
    errors.push("Description cannot exceed 500 characters");
  }

  return errors;
};

/**
 * Validates task data for update
 * @param {Object} taskData - Task data to validate
 * @returns {Array} Array of validation errors
 */
exports.validateTaskUpdate = (taskData) => {
  const errors = [];

  // Only validate provided fields
  if (taskData.title !== undefined) {
    if (taskData.title.trim() === "") {
      errors.push("Title cannot be empty");
    } else if (taskData.title.length > 100) {
      errors.push("Title cannot exceed 100 characters");
    }
  }

  if (taskData.description !== undefined) {
    if (taskData.description.trim() === "") {
      errors.push("Description cannot be empty");
    } else if (taskData.description.length > 500) {
      errors.push("Description cannot exceed 500 characters");
    }
  }

  return errors;
};
