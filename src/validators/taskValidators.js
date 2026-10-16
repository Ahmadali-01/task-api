const ApiError = require('../utils/ApiError');

const VALID_STATUSES   = ['todo', 'in_progress', 'done'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

function isValidISODate(str) {
  if (typeof str !== 'string') return false;
  const d = new Date(str);
  return !isNaN(d.getTime());
}

function validateTaskPayload(body, { partial = false } = {}) {
  const errors = [];
  const data = {};

  if (body.title !== undefined) {
    if (typeof body.title !== 'string') {
      errors.push({ field: 'title', message: 'Title must be a string' });
    } else {
      const t = body.title.trim();
      if (t.length === 0)       errors.push({ field: 'title', message: 'Title cannot be empty' });
      else if (t.length > 200)  errors.push({ field: 'title', message: 'Title must be 200 characters or less' });
      else                      data.title = t;
    }
  } else if (!partial) {
    errors.push({ field: 'title', message: 'Title is required' });
  }

  if (body.description !== undefined) {
    if (body.description !== null && typeof body.description !== 'string') {
      errors.push({ field: 'description', message: 'Description must be a string' });
    } else if (body.description && body.description.length > 2000) {
      errors.push({ field: 'description', message: 'Description must be 2000 characters or less' });
    } else {
      data.description = body.description ? body.description.trim() : null;
    }
  }

  if (body.status !== undefined) {
    if (!VALID_STATUSES.includes(body.status)) {
      errors.push({ field: 'status', message: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
    } else {
      data.status = body.status;
    }
  }

  if (body.priority !== undefined) {
    if (!VALID_PRIORITIES.includes(body.priority)) {
      errors.push({ field: 'priority', message: `Priority must be one of: ${VALID_PRIORITIES.join(', ')}` });
    } else {
      data.priority = body.priority;
    }
  }

  if (body.dueDate !== undefined) {
    if (body.dueDate === null) {
      data.due_date = null;
    } else if (!isValidISODate(body.dueDate)) {
      errors.push({ field: 'dueDate', message: 'dueDate must be a valid ISO 8601 date' });
    } else {
      data.due_date = new Date(body.dueDate).toISOString();
    }
  }

  if (errors.length) throw new ApiError(422, 'Validation failed', errors);
  return data;
}

function validateId(id) {
  const n = Number(id);
  if (!Number.isInteger(n) || n <= 0) throw new ApiError(400, 'Invalid task ID');
  return n;
}

module.exports = {
  validateTaskPayload,
  validateId,
  VALID_STATUSES,
  VALID_PRIORITIES,
};
