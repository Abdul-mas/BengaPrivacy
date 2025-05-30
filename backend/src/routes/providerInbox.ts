import express from 'express';
import { getProviderInbox } from '../services/inboxService';

const router = express.Router();

// GET /api/provider/inbox?id=providerId
router.get('/', async (req, res) => {
  const providerId = req.query.id as string;

  if (!providerId) {
    return res.status(400).json({ error: 'Provider ID is required.' });
  }

  try {
    const requests = await getProviderInbox(providerId);
    res.json({ requests });
  } catch (error) {
    console.error('❌ Inbox fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
