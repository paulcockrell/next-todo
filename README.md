# Todo App

Todo app built with NextJS. Using Auth0 and Airtable

## Prerequisits

### Code
1. Install Node
1. Clone repo
2. Install Node dependencies

### Environment variables

Copy `.env.local.template` to .env.local

### Auth0

Create Auth0 account (free) and follow this [auth0 guide](https://github.com/auth0/nextjs-auth0#getting-started) on setting up your application correctly.

Copy keys in to `.env.local`

### Airtable

Create Airtable account (free) and setup an app, and a 'base' called `todo`. In the `todo` (data)base
modify it to have the following fields

1. Name: `description`, type: `Single line text`
2. Name: `completed`, type: `Checkbox`
3. Name: `userId`, type: `Single line text`

Copy api keys and app details to `.env.local`

## Run

```
npm run dev
```

## Deploy

```
npx serverless --aws-profile <aws.profile>
```
