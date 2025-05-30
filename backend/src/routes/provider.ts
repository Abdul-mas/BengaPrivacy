import express from 'express';
import Provider from '../models/ProviderModel';
import { getProviderBrokerName } from '../brokers/provider/assignBroker';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id, privacy } = req.body;

    if (!id || !privacy) {
      return res.status(400).json({ error: 'ID and privacy are required.' });
    }

    // Check for existing provider
    const existing = await Provider.findOne({ id });
    if (existing) {
      return res.status(400).json({ error: 'Provider already registered.' });
    }

    const provider = new Provider({ id, privacy });
    await provider.save();

    const broker = getProviderBrokerName(privacy);
    res.json({ broker });
  } catch (error) {
    console.error('❌ Provider registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
