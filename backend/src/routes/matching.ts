import express from 'express';
import { findMatchingProvider } from '../services/matchingService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const result = await findMatchingProvider(req.body);
    res.json(result);
  } catch (error) {
    console.error('Matching error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
