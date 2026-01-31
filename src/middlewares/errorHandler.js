import winston from 'winston';

const logger = winston.createLogger({ });

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`${req.method} ${req.url} - ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
