export function getRequesterBrokerName(privacy: string): string {
  switch (privacy) {
    case 'reveal_both': return 'Negotiator';
    case 'hide_id': return 'Mediator';
    case 'hide_req': return 'Advertiser';
    case 'hide_both': return 'Bulletinboard';
    default: return 'Unknown';
  }
}
