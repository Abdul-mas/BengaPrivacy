import RequesterInbox from '../../models/RequesterInboxModel';
import ProviderInbox from '../../models/ProviderInboxModel';

type RecipientType = 'requester' | 'provider';

interface Message {
  from: string;
  to: string; // requesterId or providerId
  content: string;
  broker: string;
  recipientType: RecipientType;
  timestamp?: Date;
}

export async function dispatchMessage(message: Message): Promise<void> {
  const messageEntry = {
    from: message.from,
    content: message.content,
    broker: message.broker,
    timestamp: message.timestamp || new Date(),
  };

  if (message.recipientType === 'requester') {
    await RequesterInbox.updateOne(
      { requesterId: message.to },
      { $push: { messages: messageEntry } },
      { upsert: true }
    );
  } else if (message.recipientType === 'provider') {
    await ProviderInbox.updateOne(
      { providerId: message.to },
      { $push: { messages: messageEntry } },
      { upsert: true }
    );
  } else {
    throw new Error(`Invalid recipientType: ${message.recipientType}`);
  }
}
