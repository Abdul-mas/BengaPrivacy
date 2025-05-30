import express from 'express';
import Provider from '../models/ProviderModel';
import { ProviderService } from '../models/ProviderServiceModel';

import { handleBroadcaster } from '../brokers/provider/Broadcaster';
import { handleArbitrator } from '../brokers/provider/Arbitrator';
import { handleRecommender } from '../brokers/provider/Recommender';
import { handleAnonymizer } from '../brokers/provider/Anonymizer';

const router = express.Router();

router.post('/broadcast', async (req, res) => {
  const { brokerName } = req.body;

  if (!brokerName) {
    return res.status(400).json({ error: 'brokerName is required' });
  }

  try {
    const providers = await Provider.find({});
    const services = await ProviderService.find({});

    for (const provider of providers) {
      const providerServices = services.filter(s => s.providerId === provider.id);

      switch (provider.privacy) {
        case 'reveal_both':
          handleArbitrator(provider, providerServices);
          break;
        case 'hide_id':
          handleBroadcaster(provider, providerServices);
          break;
        case 'hide_ser':
          handleRecommender(provider, providerServices);
          break;
        case 'hide_both':
          handleAnonymizer(provider, providerServices);
          break;
        default:
          console.warn(`⚠️ Unknown privacy setting for provider ${provider.id}`);
      }
    }

    res.status(200).json({ message: 'All provider brokers handled successfully.' });
  } catch (err) {
    console.error('❌ Broker handling error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
