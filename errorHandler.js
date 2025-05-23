 
 // Global error handling middleware
  
const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);

  // Default error status and message
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    status: "error",
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
