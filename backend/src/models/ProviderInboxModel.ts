import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  from: String,
  content: String,
  broker: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const providerInboxSchema = new mongoose.Schema({
  providerId: {
    type: String,
    required: true,
    unique: true
  },
  messages: [messageSchema]
});

export default mongoose.model('ProviderInbox', providerInboxSchema);
