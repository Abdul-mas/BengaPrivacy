import express from 'express';
import {ProviderService} from '../models/ProviderServiceModel';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { providerId, name, cost, resultFormat } = req.body;

    if (!providerId || !name || !cost || !resultFormat) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newService = new ProviderService({ providerId, name, cost, resultFormat });
    await newService.save();
    res.json({ message: 'Service registered successfully.' });
  } catch (error) {
    console.error('❌ Service registration error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
