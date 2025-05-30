// backend/src/brokers/requester/Advertiser.ts

import { Requester } from '../../models/RequesterModel';
import { dispatchMessage } from '../shared/MessageDispatcher';

export async function handleAdvertiser(requester: Requester) {
  const requesterId = requester.privacy === 'hide_id' || requester.privacy === 'hide_both'
    ? 'Anonymous'
    : requester.id;

  const messageText = requester.privacy === 'hide_req' || requester.privacy === 'hide_both'
    ? 'Request is hidden as per privacy settings.'
    : `Request: ${requester.req}`;

  // Dispatch to requester's inbox
  await dispatchMessage({
    from: 'Advertiser',
    to: requester.id, // actual requester ID for delivery
    content: messageText,
    broker: 'Advertiser',
    recipientType: 'requester',
  });

  return {
    broker: 'Advertiser',
    requester: requesterId,
    message: messageText,
  };
}
