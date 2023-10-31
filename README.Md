# Exercise Tracker

To run this project you need to have pnpm installed.

In case you don't have, install with

```
npm install -g pnpm
```

Then run

```
pnpm install
cp apps/backend/env.example apps/backend/.env
cp apps/frontend/env.example apps/frontend/.env
pnpm -C apps/backend migrate up
pnpm dev

```

Frontend is now runing on http://localhost:3000 and backend on http://localhost:8000

To log in, use the following credentials:

```
username: admin
password: admin
```

To run tests

```
pnpm test
```
