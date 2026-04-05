import type { AttioConfiguration, UserAnswers } from './types';

export async function generateConfiguration(answers: Partial<UserAnswers>): Promise<AttioConfiguration> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate configuration');
  }

  if (!response.body) {
    throw new Error('No response body received');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    fullText += decoder.decode(value, { stream: true });
  }

  fullText = fullText.trim();

  // Strip markdown code fences if present
  if (fullText.startsWith('```')) {
    fullText = fullText.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }

  const parsed = JSON.parse(fullText);

  // Check if the response is an error object from the stream
  if (parsed.error) {
    throw new Error(parsed.error);
  }

  return parsed as AttioConfiguration;
}
