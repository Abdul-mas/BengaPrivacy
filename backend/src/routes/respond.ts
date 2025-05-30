import express from 'express';
import { handleProviderResponse } from '../services/respondService';

const router = express.Router();

// POST /api/provider/respond
router.post('/', async (req, res) => {
  const { providerId, requestId, result } = req.body;

  if (!providerId || !requestId || !result) {
    return res.status(400).json({ error: 'Missing fields in response.' });
  }

  try {
    await handleProviderResponse({ providerId, requestId, result });
    res.json({ message: 'Response handled successfully.' });
  } catch (error) {
    console.error('❌ Respond error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
