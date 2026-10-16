const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const tasksRouter = require('./routes/tasks');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '100kb' }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    name: 'Task API',
    version: '1.0.0',
    endpoints: {
      listTasks:   'GET    /api/tasks',
      getTask:     'GET    /api/tasks/:id',
      createTask:  'POST   /api/tasks',
      replaceTask: 'PUT    /api/tasks/:id',
      updateTask:  'PATCH  /api/tasks/:id',
      deleteTask:  'DELETE /api/tasks/:id',
    },
  });
});

app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

app.use('/api/tasks', tasksRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
