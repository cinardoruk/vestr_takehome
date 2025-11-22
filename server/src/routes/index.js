import express from 'express';
import healthRouter from './health.js';
import apiRouter from './api.js';

const router = express.Router();

// Mount route groups
router.use('/health', healthRouter);
router.use('/api', apiRouter);

export default router;
