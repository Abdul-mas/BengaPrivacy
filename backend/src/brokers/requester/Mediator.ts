// backend/src/brokers/requester/Mediator.ts

import { Requester } from '../../models/RequesterModel';
import { dispatchMessage } from '../shared/MessageDispatcher';

export async function handleMediator(requester: Requester) {
  const requestText =
    requester.privacy === 'hide_req' || requester.privacy === 'hide_both'
      ? 'Request is hidden.'
      : `Request: ${requester.req}`;

  // Deliver message to the inbox
  await dispatchMessage({
    from: 'Mediator',
    to: requester.id, // must still use real ID to store the message
    content: requestText,
    broker: 'Mediator',
    recipientType: 'requester',
  });

  return {
    broker: 'Mediator',
    requester: 'Anonymous',
    message: requestText,
  };
}
