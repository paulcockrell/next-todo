# Todo App

Todo app built with NextJS. Using Auth0 and FaunaDB

## Prerequisits

### Code
1. Install Node
1. Clone repo
2. Install Node dependencies

### Environment variables

Copy `.env.local.template` to .env.local

### Auth0

Create [Auth0](https://auth0.com) account and follow this [auth0 guide](https://github.com/auth0/nextjs-auth0#getting-started) on setting up your application correctly.

Copy keys in to `.env.local`
```
AUTH0_SECRET=""
AUTH0_BASE_URL=""
AUTH0_ISSUER_BASE_URL=""
AUTH0_CLIENT_ID=""
AUTH0_CLIENT_SECRET=""
```

### FaunaDB

Create [FaunaDB](https://fauna.com) account and setup an app, and a new database (collection) called `Todo` for example.

In security create a new key, and copy it to `.env.local`
```
FAUNA_DB=""
```

## Run

```
npm run dev
```

## Deploy

```
npx serverless --aws-profile <aws.profile>
```
