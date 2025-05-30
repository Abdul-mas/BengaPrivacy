export async function getProviderInbox(providerId: string) {
  // You can fetch from a shared store, DB, or mocked logic
  // For now, simulate one incoming request
  return [
    {
      id: 'req1',
      requesterId: 'Req123',
      request: 'Diagnosis',
      broker: 'Arbitrator'
    }
  ];
}
