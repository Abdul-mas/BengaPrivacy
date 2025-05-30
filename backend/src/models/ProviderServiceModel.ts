import mongoose from 'mongoose';

const providerServiceSchema = new mongoose.Schema({
  providerId: { type: String, required: true },
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  resultFormat: { type: String, required: true }
});

export const ProviderService = mongoose.model('ProviderService', providerServiceSchema);
