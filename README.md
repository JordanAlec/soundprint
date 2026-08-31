# SoundPrint

**Demo:** [soundprint.jordanalec.co.uk/](https://soundprint.jordanalec.co.uk/)

Build a musical profile (instruments, qualifications, bands, highlights) and
get a shareable link back. No account, no database: the profile data lives
entirely in the URL, gzip-compressed and base64url-encoded. Editing a profile
always produces a new link; the old one still resolves to the old data.

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, Zod. Vitest for unit
tests, Playwright for e2e.

## Getting started

```
cp .env.template .env.local   # fill in NEXT_PUBLIC_SITE_URL
npm install
npm run dev
```

## Scripts

- `npm run dev`: start the dev server
- `npm run build` / `npm run start`: production build and serve
- `npm run lint`: eslint
- `npm test`: unit tests (Vitest)
- `npm run test:watch`: unit tests in watch mode
- `npm run test:e2e`: Playwright e2e tests; starts its own dev server on
  port 3000 if one isn't already running

## Routes

- `/`: home
- `/create`: profile builder
- `/profile/[token]`: decoded, read-only profile view
- `/faq`: how it works
