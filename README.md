# NexusHub Shop ;)

## Getting Started

Before first run make sure you have **_.env_** file in your root folder with that variable:

```.env
PORT = 3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

SECRET_KEY = ...

POSTGRES_USER=...
POSTGRES_PASSWORD=...
POSTGRES_DB=...
PGADMIN_DEFAULT_EMAIL=...
PGADMIN_DEFAULT_PASSWORD=...

DATABASE_URL=postgresql://POSTGRES_USER:POSTGRES_PASSWORD@localhost:5432/POSTGRES_DB?

NEXTAUTH_SECRET= ...
NEXTAUTH_URL=http://localhost:3000

```

for login from other platform you need also:

```
GITHUB_ID=...
GITHUB_SECRET=...
GITHUB_PRIVATE_KEY=...

FACEBOOK_ID=...
FACEBOOK_SECRET=...

APPLE_ID=...
APPLE_SECRET=...

GOOGLE_ID=...
GOOGLE_SECRET=...
```

## First Start Local

the development server:

```bash
npm run dev:local
# or
yarn dev:local
# or
pnpm dev:local
# or
bun dev:local
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Simple Data

If wanna simple data for start just use:

```seed
npm run db:seed
# or
yarn db:seed
# or
pnpm db:seed
# or
bun db:seed
```

###### \***_For access to online DataBase on NEON just write me message :)_**

## APP on Vercel

Check:
https://nexus-hub-sigma.vercel.app
