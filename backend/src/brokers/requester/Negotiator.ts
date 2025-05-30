// backend/src/brokers/requester/Negotiator.ts

import { Requester } from '../../models/RequesterModel';
import { dispatchMessage } from '../shared/MessageDispatcher';

export async function handleNegotiator(requester: Requester) {
  const messageText = `Request: ${requester.req}`;

  // Send to inbox
  await dispatchMessage({
    from: 'Negotiator',
    to: requester.id,
    content: messageText,
    broker: 'Negotiator',
    recipientType: 'requester',
  });

  return {
    broker: 'Negotiator',
    requester: requester.id,
    message: messageText,
  };
}
