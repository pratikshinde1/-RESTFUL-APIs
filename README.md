#  -RESTful-API

 

A simple RESTful API built with Node.js and Express.js that allows users to manage a collection of tasks.

## Features

- Complete CRUD operations for RESTful api
- In-memory data storage (no database required)
- Input validation for all operations
- Pagination support for task listing
- Proper error handling with appropriate HTTP status codes

## API Endpoints

| Method | Endpoint   | Description                          |
| ------ | ---------- | ------------------------------------ |
| GET    | /tasks     | Retrieve all tasks (with pagination) |
| GET    | /tasks/:id | Retrieve a specific task by ID       |
| POST   | /tasks     | Create a new task                    |
| PUT    | /tasks/:id | Update an existing task by ID        |
| DELETE | /tasks/:id | Delete a task by ID                  |

 

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm (Node Package Manager)

 
The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Documentation

### Task Object

```json
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the RESTful API project",
  "status": "pending",
  "createdAt": "2025-05-22T10:30:00.000Z",
  "updatedAt": "2025-05-22T10:30:00.000Z"
}
```

### Task Properties

| Property    | Type   | Description                                           |
| ----------- | ------ | ----------------------------------------------------- |
| id          | Number | Unique identifier (auto-generated)                    |
| title       | String | Task title (3-100 characters)                         |
| description | String | Task description (5-1000 characters)                  |
| status      | String | Task status (pending, in progress, completed)         |
| createdAt   | String | ISO date string when the task was created             |
| updatedAt   | String | ISO date string when the task was last updated        |

### Create a Task (POST /tasks)

**Request:**

```json
{
  "title": "Learn Node.js",
  "description": "Study Node.js and Express for building RESTful APIs",
  "status": "in progress"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 1,
    "title": "Learn Node.js",
    "description": "Study Node.js and Express for building RESTful APIs",
    "status": "in progress",
    "createdAt": "2025-05-22T10:30:00.000Z",
    "updatedAt": "2025-05-22T10:30:00.000Z"
  }
}
```

### Get All Tasks (GET /tasks)

**Request:**
```
GET /tasks
```

Optional query parameters:
- `page`: Page number (default: 1)
- `limit`: Number of tasks per page (default: 10, max: 100)

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Learn Node.js",
      "description": "Study Node.js and Express for building RESTful APIs",
      "status": "in progress",
      "createdAt": "2025-05-22T10:30:00.000Z",
      "updatedAt": "2025-05-22T10:30:00.000Z"
    },
    {
      "id": 2,
      "title": "Create RESTful API",
      "description": "Build a simple task manager API using Express",
      "status": "pending",
      "createdAt": "2025-05-22T11:00:00.000Z",
      "updatedAt": "2025-05-22T11:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 2,
    "page": 1,
    "limit": 10,
    "pages": 1,
    "hasMore": false
  }
}
```

### Get a Task by ID (GET /tasks/:id)

**Request:**
```
GET /tasks/1
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Learn Node.js",
    "description": "Study Node.js and Express for building RESTful APIs",
    "status": "in progress",
    "createdAt": "2025-05-22T10:30:00.000Z",
    "updatedAt": "2025-05-22T10:30:00.000Z"
  }
}
```

**Response (404 Not Found):**

```json
{
  "success": false,
  "message": "Task with ID 1 not found"
}
```

### Update a Task (PUT /tasks/:id)

**Request:**
```
PUT /tasks/1
```

```json
{
  "title": "Learn Node.js",
  "description": "Study Node.js and Express for building RESTful APIs",
  "status": "completed"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": 1,
    "title": "Learn Node.js",
    "description": "Study Node.js and Express for building RESTful APIs",
    "status": "completed",
    "createdAt": "2025-05-22T10:30:00.000Z",
    "updatedAt": "2025-05-22T12:45:00.000Z"
  }
}
```

### Delete a Task (DELETE /tasks/:id)

**Request:**
```
DELETE /tasks/1
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Task with ID 1 deleted successfully"
}
```

## Error Handling

The API includes comprehensive error handling that returns appropriate status codes and informative error messages.

### Validation Errors (400 Bad Request)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Title is required",
    "Description must be at least 5 characters long"
  ]
}
```

### Not Found Errors (404 Not Found)

```json
{
  "success": false,
  "message": "Task with ID 999 not found"
}
```

### Server Errors (500 Internal Server Error)

```json
{
  "success": false,
  "message": "An unexpected error occurred",
  "error": "Error details (only in development mode)"
}
```

## Testing the API

### Testing with Postman

1. Open Postman
2. Create a new request collection for the Task Manager API
3. Create requests for each endpoint:
   - GET http://localhost:3000/tasks
   - GET http://localhost:3000/tasks/1
   - POST http://localhost:3000/tasks (with JSON body)
   - PUT http://localhost:3000/tasks/1 (with JSON body)
   - DELETE http://localhost:3000/tasks/1

### Testing with curl

**Get all tasks:**
```bash
curl http://localhost:3000/tasks
```

**Get a specific task:**
```bash
curl http://localhost:3000/tasks/1
```

**Create a new task:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Task description","status":"pending"}'
```

**Update a task:**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task","description":"Updated description","status":"completed"}'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```
 

