# API Reference

Base URL: http://localhost:3000

## GET /api/tasks

List all tasks. Filters: status, priority, search.

Response 200:
{
  "count": 2,
  "data": [ { "id": 1, "title": "...", "status": "todo" } ]
}

## GET /api/tasks/:id

Get one task.

Response 200: { "data": { "id": 1, "title": "..." } }
Response 400: invalid id
Response 404: not found

## POST /api/tasks

Create a task. Title required.

Body:
{
  "title": "Ship the API",
  "description": "Push to prod",
  "status": "todo",
  "priority": "high",
  "dueDate": "2026-02-01"
}

Response 201: { "data": { ...created task } }
Response 422: validation failed

## PUT /api/tasks/:id

Full replace. Same body as POST.

Response 200: updated task
Response 404: not found

## PATCH /api/tasks/:id

Partial update.

Body: { "status": "done" }

Response 200: updated task
Response 400: no valid fields
Response 404: not found

## DELETE /api/tasks/:id

Response 204: deleted
Response 404: not found

## Status Codes

200 OK, 201 Created, 204 No Content, 400 Bad Request,
404 Not Found, 422 Validation Failed, 500 Server Error
