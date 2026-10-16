# Task API

RESTful Task Manager API — Node.js, Express, SQLite.

## Setup

npm install
cp .env.example .env
npm run dev

Server runs at http://localhost:3000

## Data Model — Task

| Field       | Type    | Notes                              |
|-------------|---------|------------------------------------|
| id          | integer | Primary key, auto                  |
| title       | string  | Required, 1-200 chars              |
| description | string  | Optional, max 2000 chars           |
| status      | enum    | todo / in_progress / done          |
| priority    | enum    | low / medium / high                |
| dueDate     | string  | Optional, ISO 8601                 |
| createdAt   | string  | Auto timestamp                     |
| updatedAt   | string  | Auto timestamp                     |

## Endpoints

| Method | Path           | Description              |
|--------|----------------|--------------------------|
| GET    | /api/tasks     | List all tasks           |
| GET    | /api/tasks/:id | Get one task             |
| POST   | /api/tasks     | Create task              |
| PUT    | /api/tasks/:id | Replace task             |
| PATCH  | /api/tasks/:id | Partial update           |
| DELETE | /api/tasks/:id | Delete task              |

## Examples

curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"Ship the API"}'

curl http://localhost:3000/api/tasks

curl -X DELETE http://localhost:3000/api/tasks/1

## Errors

Validation errors return 422 with details array.
Missing resources return 404.
Invalid IDs return 400.

## Structure

src/index.js, src/app.js, src/db.js, src/routes/, src/controllers/, src/validators/, src/middleware/, src/utils/

## License

MIT
