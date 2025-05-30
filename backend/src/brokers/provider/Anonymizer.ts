import Provider from '../../models/ProviderModel';
import { ProviderService as ProviderServiceModel } from '../../models/ProviderServiceModel';
import type { Document } from 'mongoose';

export function handleAnonymizer(
  provider: Document & { id: string; privacy: string },
  services: (Document & { name: string; cost: number; resultFormat: string })[]
)  {
  return {
    broker: 'Anonymizer',
    provider: 'Anonymous',
    services: services.map(service => ({
      name: service.name,
      cost: service.cost,
      resultFormat: service.resultFormat,
    }))
  };
}