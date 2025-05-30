import  Requester  from '../models/RequesterModel';
import  Provider  from '../models/ProviderModel';
import {ProviderService}  from '../models/ProviderServiceModel';

interface MatchResult {
  match: string;
  score: number;
  broker: string;
}

export async function findMatchingProvider(reqBody: {
  id: string;
  req: string;
  privacy: string;
}): Promise<MatchResult | { error: string }> {
  const { id, req, privacy } = reqBody;

  // Lookup requester profile
  const requester = await Requester.findOne({ id });
  if (!requester) {
    return { error: 'Requester not found. Please register first.' };
  }

  // Store the request if not already saved
  if (!requester.req) {
    requester.req = req;
    await requester.save();
  }

  // Fetch all providers and their services
  const providers = await Provider.find({});
  const services = await ProviderService.find({});

  // Simple match logic: find a service with highest string similarity score (can be replaced with fuzzy logic)
  let bestScore = 0;
  let bestProvider = null;
  let matchedBroker = '';

  for (const provider of providers) {
    // Skip providers violating requester's privacy
    if (
      (provider.privacy === 'hide_ser' && privacy === 'hide_req') ||
      provider.privacy === 'hide_both' ||
      privacy === 'hide_both'
    ) {
      continue;
    }

    const serviceList = services.filter(s => s.providerId === provider.id);
    for (const service of serviceList) {
      const score = req.toLowerCase() === service.name.toLowerCase() ? 1 : 0;
      if (score > bestScore) {
        bestScore = score;
        bestProvider = provider;
        matchedBroker = provider.privacy; // used to assign a provider broker (e.g., Arbitrator, etc.)
      }
    }
  }

  if (!bestProvider) {
    return { error: 'No matching provider found.' };
  }

  return {
    match: bestProvider.privacy === 'hide_id' || bestProvider.privacy === 'hide_both' ? 'Anonymous Provider' : bestProvider.id,
    score: bestScore,
    broker: matchedBroker,
  };
}
