import express from 'express';
import RequesterInbox from '../models/RequesterInboxModel';
import ProviderInbox from '../models/ProviderInboxModel';

const router = express.Router();

// GET /inbox/requester/:id
router.get('/requester/:id', async (req, res) => {
  try {
    const inbox = await RequesterInbox.findOne({ requesterId: req.params.id });
    res.json(inbox?.messages || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requester inbox.' });
  }
});

// GET /inbox/provider/:id
router.get('/provider/:id', async (req, res) => {
  try {
    const inbox = await ProviderInbox.findOne({ providerId: req.params.id });
    res.json(inbox?.messages || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch provider inbox.' });
  }
});

export default router;
