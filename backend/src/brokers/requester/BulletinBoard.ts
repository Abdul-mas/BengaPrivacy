// backend/src/brokers/requester/BulletinBoard.ts

import { Requester } from '../../models/RequesterModel';
import { dispatchMessage } from '../shared/MessageDispatcher';

export async function handleBulletinBoard(requester: Requester) {
  const messageText = 'Both ID and request are hidden as per privacy policy.';

  // Send to actual requester inbox
  await dispatchMessage({
    from: 'BulletinBoard',
    to: requester.id,
    content: messageText,
    broker: 'BulletinBoard',
    recipientType: 'requester',
  });

  return {
    broker: 'BulletinBoard',
    requester: 'Anonymous',
    message: messageText,
  };
}
