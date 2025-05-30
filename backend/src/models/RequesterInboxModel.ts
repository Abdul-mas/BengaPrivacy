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

const requesterInboxSchema = new mongoose.Schema({
  requesterId: {
    type: String,
    required: true,
    unique: true
  },
  messages: [messageSchema]
});

export default mongoose.model('RequesterInbox', requesterInboxSchema);
