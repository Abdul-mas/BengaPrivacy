import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  privacy: { type: String, required: true }
});

const Provider = mongoose.model('Provider', providerSchema);

export default Provider;
