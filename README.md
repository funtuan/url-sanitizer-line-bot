# URL Sanitizer LINE Bot

A LINE messaging bot built with Cloudflare Workers that automatically strips privacy-intruding tracking parameters from URLs shared in chats.

## Features

- **Instagram**: Removes the `igsh` parameter to protect personal account privacy.
- **YouTube**: Removes the `si` tracking parameter.
- **Threads**: Removes `xmt`, `slof`, and other tracking parameters.
- **Seamless Experience**: Re-transmits the original message with fully cleaned, privacy-safe URLs.

### Example

**User Input:**
`This is a great post! https://www.threads.com/@cherrylee3338/post/DV5p_gukVQs?xmt=ABCDE12341234`

**Bot Response:**
`This is a great post! https://www.threads.com/@cherrylee3338/post/DV5p_gukVQs`

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Cloudflare Account](https://dash.cloudflare.com/) (to deploy via Cloudflare Workers)
- [LINE Developers Account](https://developers.line.biz/en/) (to create a Messaging API channel)

## Getting Started

### 1. Installation

Install the required dependencies:

```bash
npm install
```

### 2. Configuration

Obtain your **Channel Access Token** and **Channel Secret** from the LINE Developers Console.

For local development, create a `.dev.vars` file in the root directory:
```env
LINE_CHANNEL_ACCESS_TOKEN="your_channel_access_token_here"
LINE_CHANNEL_SECRET="your_channel_secret_here"
```

For production deployment, securely add your secrets to Cloudflare:
```bash
npx wrangler secret put LINE_CHANNEL_ACCESS_TOKEN
npx wrangler secret put LINE_CHANNEL_SECRET
```

### 3. Local Development

Run the worker locally using Wrangler:

```bash
npx wrangler dev
```

*Note: To test the webhook locally with LINE, you may need to expose your local server using a tool like [ngrok](https://ngrok.com/) or [Cloudflare Tunnels](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/).*

## Deployment

Deploy the worker to the Cloudflare network:

```bash
npx wrangler deploy
```

Once deployed, copy the generated Cloudflare Worker URL and set it as your **Webhook URL** in the LINE Developers Console. Do not forget to enable **Use webhook**.

## Project Structure

- `src/index.ts`: The main entry point handling incoming LINE Webhook POST requests.
- `src/cleaner.ts`: The core regular expression and URL parsing logic for sanitizing links.
- `wrangler.toml`: The Cloudflare Workers configuration file.

## License

This project is licensed under the MIT License.

