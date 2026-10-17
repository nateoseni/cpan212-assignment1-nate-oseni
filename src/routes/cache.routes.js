import { Router } from 'express';
import { getCacheStats } from '../lib/weather.js';

export const cacheRouter = Router();

cacheRouter.get('/cache/stats', (req, res) => {
  const stats = getCacheStats();
  return res.status(200).json({ data: stats });
});
