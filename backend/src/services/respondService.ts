export async function handleProviderResponse({ providerId, requestId, result }: {
  providerId: string;
  requestId: string;
  result: string;
}) {
  // Simulate response logic. You could store result to DB, send via broker etc.
  console.log(`✅ Provider ${providerId} responded to ${requestId}: ${result}`);
}
