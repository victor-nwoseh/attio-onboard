import Anthropic from '@anthropic-ai/sdk';
import { ANTHROPIC_API_KEY } from '$env/static/private';
import { buildSystemPrompt, buildUserMessage } from '$lib/utils/prompt';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { UserAnswers } from '$lib/utils/types';

export const config = { maxDuration: 300 };

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

    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 16384,
      system: buildSystemPrompt(),
      messages: [
        { role: 'user', content: buildUserMessage(answers) }
      ]
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          if (err instanceof Anthropic.APIError) {
            if (err.status === 529 || err.status === 429) {
              controller.enqueue(
                encoder.encode(JSON.stringify({ error: 'The AI service is temporarily overloaded. Please try again in a moment.' }))
              );
            } else if (err.status === 401) {
              controller.enqueue(
                encoder.encode(JSON.stringify({ error: 'API authentication failed. Please check the configuration.' }))
              );
            } else {
              controller.enqueue(
                encoder.encode(JSON.stringify({ error: 'Something went wrong generating your configuration. Please try again.' }))
              );
            }
          } else {
            controller.enqueue(
              encoder.encode(JSON.stringify({ error: 'Something went wrong generating your configuration. Please try again.' }))
            );
          }
          controller.close();
        }
      }
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked'
      }
    });
  } catch (err) {
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
    return json({ error: 'Something went wrong generating your configuration. Please try again.' }, { status: 500 });
  }
};
