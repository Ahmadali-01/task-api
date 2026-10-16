const db = require('../db');
const ApiError = require('../utils/ApiError');
const { validateTaskPayload, validateId } = require('../validators/taskValidators');

function toApi(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    priority: row.priority,
    dueDate: row.due_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

exports.listTasks = (req, res) => {
  const { status, priority, search } = req.query;
  let sql = 'SELECT * FROM tasks';
  const conditions = [];
  const params = {};

  if (status)   { conditions.push('status = @status');   params.status = status; }
  if (priority) { conditions.push('priority = @priority'); params.priority = priority; }
  if (search)   {
    conditions.push('(title LIKE @search OR description LIKE @search)');
    params.search = `%${search}%`;
  }

  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY created_at DESC';

  const rows = db.prepare(sql).all(params);
  res.json({ count: rows.length, data: rows.map(toApi) });
};

exports.getTask = (req, res) => {
  const id = validateId(req.params.id);
  const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (!row) throw new ApiError(404, `Task with id ${id} not found`);
  res.json({ data: toApi(row) });
};

exports.createTask = (req, res) => {
  const data = validateTaskPayload(req.body);

  const info = db.prepare(`
    INSERT INTO tasks (title, description, status, priority, due_date)
    VALUES (@title, @description, @status, @priority, @due_date)
  `).run({
    title:       data.title,
    description: data.description ?? null,
    status:      data.status      ?? 'todo',
    priority:    data.priority    ?? 'medium',
    due_date:    data.due_date    ?? null,
  });

  const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json({ data: toApi(row) });
};

exports.replaceTask = (req, res) => {
  const id = validateId(req.params.id);
  const existing = db.prepare('SELECT id FROM tasks WHERE id = ?').get(id);
  if (!existing) throw new ApiError(404, `Task with id ${id} not found`);

  const data = validateTaskPayload(req.body, { partial: false });

  db.prepare(`
    UPDATE tasks
       SET title       = @title,
           description = @description,
           status      = @status,
           priority    = @priority,
           due_date    = @due_date,
           updated_at  = datetime('now')
     WHERE id = @id
  `).run({
    id,
    title:       data.title,
    description: data.description ?? null,
    status:      data.status      ?? 'todo',
    priority:    data.priority    ?? 'medium',
    due_date:    data.due_date    ?? null,
  });

  const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  res.json({ data: toApi(row) });
};

exports.updateTask = (req, res) => {
  const id = validateId(req.params.id);
  const existing = db.prepare('SELECT id FROM tasks WHERE id = ?').get(id);
  if (!existing) throw new ApiError(404, `Task with id ${id} not found`);

  const data = validateTaskPayload(req.body, { partial: true });
  if (Object.keys(data).length === 0) {
    throw new ApiError(400, 'No valid fields provided to update');
  }

  const fields = Object.keys(data).map((k) => `${k} = @${k}`).join(', ');

  db.prepare(`
    UPDATE tasks SET ${fields}, updated_at = datetime('now') WHERE id = @id
  `).run({ ...data, id });

  const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  res.json({ data: toApi(row) });
};

exports.deleteTask = (req, res) => {
  const id = validateId(req.params.id);
  const info = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  if (info.changes === 0) throw new ApiError(404, `Task with id ${id} not found`);
  res.status(204).send();
};
