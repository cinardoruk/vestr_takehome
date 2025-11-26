import express from 'express';
import cors from 'cors';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';

/**
 * Create and configure Express application
 */
export function createApp() {
  const app = express();

  // Middleware
  app.use(cors()); // Enable CORS for all routes
  app.use(requestLogger);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/', routes);

  // 404 handler (must be after all routes)
  app.use(notFoundHandler);

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}
