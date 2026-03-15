import { cleanText } from './cleaner';

export interface Env {
  LINE_CHANNEL_ACCESS_TOKEN: string;
  LINE_CHANNEL_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const body = await request.text();
      // 在此可加入 LINE signature 驗證 (為簡化先略過，建議實作)

      const payload = JSON.parse(body);
      const events = payload.events || [];

      for (const event of events) {
        if (event.type === 'message' && event.message.type === 'text') {
          const originalText = event.message.text;
          const cleanedText = cleanText(originalText);

          if (originalText !== cleanedText) {
            await replyMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, cleanedText);
          }
        }
      }

      return new Response('OK', { status: 200 });
    } catch (err) {
      console.error(err);
      return new Response('Error handling webhook', { status: 500 });
    }
  },
};

async function replyMessage(token: string, replyToken: string, message: string) {
  const url = 'https://api.line.me/v2/bot/message/reply';
  const body = {
    replyToken,
    messages: [
      {
        type: 'text',
        text: message,
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error('Failed to reply', await response.text());
  }
}
