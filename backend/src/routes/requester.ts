import express from 'express';
import Requester from '../models/RequesterModel';
import { getRequesterBrokerName } from '../brokers/requester/assignBroker';
import { findMatchingProvider } from '../services/matchingService';

const router = express.Router();

// ✅ POST /api/requester — Register a requester
router.post('/', async (req, res) => {
  try {
    const { id, privacy } = req.body;

    if (!id || !privacy) {
      return res.status(400).json({ error: 'ID and privacy are required.' });
    }

    const existing = await Requester.findOne({ id });
    if (existing) {
      return res.status(400).json({ error: 'Requester already registered.' });
    }

    const requester = new Requester({ id, privacy });
    await requester.save();

    const broker = getRequesterBrokerName(privacy);
    res.json({ id, privacy, broker });
  } catch (error) {
    console.error('❌ Requester registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ POST /api/requester/request — Submit a service request
router.post('/request', async (req, res) => {
  try {
    const { id, req: requestText } = req.body;

    if (!id || !requestText) {
      return res.status(400).json({ error: 'Requester ID and request are required.' });
    }

    const requester = await Requester.findOne({ id });
    if (!requester) {
      return res.status(404).json({ error: 'Requester not found.' });
    }

    const matchResult = await findMatchingProvider({
      id,
      req: requestText,
      privacy: requester.privacy
    });

    if ('error' in matchResult) {
      return res.status(404).json({ error: matchResult.error });
    }

    res.json(matchResult);
  } catch (error) {
    console.error('❌ Matching error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET /api/requester — List all registered requesters
router.get('/', async (req, res) => {
  try {
    const requesters = await Requester.find({});
    res.json(requesters);
  } catch (error) {
    console.error('❌ Failed to fetch requesters:', error);
    res.status(500).json({ error: 'Failed to load requester list' });
  }
});

// GET /api/requester/submitted — Get all requesters who submitted a service request
router.get('/submitted', async (req, res) => {
  try {
    const requestersWithRequests = await Requester.find({ req: { $exists: true, $ne: null } });
    res.json(requestersWithRequests);
  } catch (error) {
    console.error('❌ Failed to fetch submitted requests:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;
