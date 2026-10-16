const ApiError = require('../utils/ApiError');

function notFound(req, res, next) {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} not found`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  const payload = {
    error: {
      status:  statusCode,
      message: err.message || 'Internal Server Error',
    },
  };

  if (err.details) payload.error.details = err.details;

  if (process.env.NODE_ENV !== 'production' && statusCode === 500) {
    payload.error.stack = err.stack;
  }

  if (statusCode === 500) console.error(err);

  res.status(statusCode).json(payload);
}

module.exports = { notFound, errorHandler };
