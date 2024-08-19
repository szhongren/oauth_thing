This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, go to https://support.google.com/cloud/answer/6158849?hl=en and follow the instructions to create a new project and get the client ID and secret.

Then, set up .env file as below:

```
PORT=3000
GOOGLE_CLIENT_ID="<from google cloud console>"
GOOGLE_CLIENT_SECRET="<from google cloud console>"
GOOGLE_OAUTH_URL=https://accounts.google.com/o/oauth2/v2/auth
GOOGLE_ACCESS_TOKEN_URL=https://oauth2.googleapis.com/token
GOOGLE_TOKEN_INFO_URL=https://oauth2.googleapis.com/tokeninfo
GOOGLE_CALLBACK_URL=http://localhost:3000/api/oauth/google/callback
```

Then, install dependencies:

```bash
npm install
# or
yarn install
```

Then, install Redis:

```bash
brew install redis
```

Then, start Redis:

```bash
redis-server
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Or, to run tests

```bash
npm run test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
