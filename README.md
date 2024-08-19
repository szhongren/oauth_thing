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

Then, install and start Redis. We use this as a session store, so we could manage the OAuth flow with a bit more control:

```bash
brew install redis
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

Context for NextJS. It's a file/directory based routing system, so each route.ts in a folder is a different backend route, with the folder structure describing the URL. Each page.tsx is a different frontend route, again with the folder structure describing the URL. The api folder is for backend routes, which means they run on the server.

We are single user only at this moment, and the server is not stateless. If we want to have multiple users, we need to store the sessions for every user and pass the session to the client, and have them return it to us when they make a request. Making it stateless would make it much more scalable, and would be ideal in the long run.

For the OAuth2 flow, there are libraries available but I chose to implement it from scratch to understand the flow better, and managed sessions manually with Redis as well. Would probably use a library in a production environment unless we need this much control.

Only FE components are tested right now, tried some things but unable to mock out Redis for the backend tests. Would need to look into that more.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
