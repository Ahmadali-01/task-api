# API Reference — Task API

Base URL (local): `http://localhost:3000`

All endpoints return JSON. All request bodies use `Content-Type: application/json`.

---

## GET /

Returns API metadata and available endpoints.

### Response 200

```json
{
  "name": "Task API",
  "version": "1.0.0",
  "endpoints": {
    "listTasks":   "GET    /api/tasks",
    "getTask":     "GET    /api/tasks/:id",
    "createTask":  "POST   /api/tasks",
    "replaceTask": "PUT    /api/tasks/:id",
    "updateTask":  "PATCH  /api/tasks/:id",
    "deleteTask":  "DELETE /api/tasks/:id"
  }
}
