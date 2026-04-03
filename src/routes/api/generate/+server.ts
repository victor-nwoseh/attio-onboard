import Anthropic from '@anthropic-ai/sdk';
import { ANTHROPIC_API_KEY } from '$env/static/private';
import { buildSystemPrompt, buildUserMessage } from '$lib/utils/prompt';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { UserAnswers } from '$lib/utils/types';

export const config = { maxDuration: 60 };

export const POST: RequestHandler = async ({ request }) => {
  let answers: UserAnswers;

  try {
    const body = await request.json();
    answers = body.answers;
  } catch {
    return json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!answers || !answers.business_model) {
    return json({ error: 'Missing required answers' }, { status: 400 });
  }

  try {
    const client = new Anthropic({
      apiKey: ANTHROPIC_API_KEY
    });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      system: buildSystemPrompt(),
      messages: [
        { role: 'user', content: buildUserMessage(answers) }
      ]
    });

    const textBlock = response.content.find(block => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return json({ error: 'No text response from AI' }, { status: 500 });
    }

    let rawText = textBlock.text.trim();

    // Strip markdown code fences if the LLM wraps the JSON despite instructions
    if (rawText.startsWith('```')) {
      rawText = rawText.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
    }

    let configuration;
    try {
      configuration = JSON.parse(rawText);
    } catch {
      return json({ error: 'Failed to parse AI response as JSON' }, { status: 500 });
    }

    return json(configuration);
  } catch (err) {
    // Handle Anthropic SDK errors with user-friendly messages
    if (err instanceof Anthropic.APIError) {
      if (err.status === 529 || err.status === 429) {
        return json(
          { error: 'The AI service is temporarily overloaded. Please try again in a moment.' },
          { status: 503 }
        );
      }
      if (err.status === 401) {
        return json({ error: 'API authentication failed. Please check the configuration.' }, { status: 500 });
      }
    }
    const message = err instanceof Error ? err.message : 'Unknown error';
    return json({ error: `Something went wrong generating your configuration. Please try again.` }, { status: 500 });
  }
};
