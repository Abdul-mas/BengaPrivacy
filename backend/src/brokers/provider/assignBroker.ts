export function getProviderBrokerName(privacy: string): string {
  switch (privacy) {
    case 'reveal_both': return 'Arbitrator';
    case 'hide_id': return 'Broadcaster';
    case 'hide_ser': return 'Recommender';
    case 'hide_both': return 'Anonymizer';
    default: return 'Unknown';
  }
}
