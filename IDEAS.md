# SoundPrint — Ideas & Direction

## What it is

A browser-based tool for musicians to build a "musical profile" — an at-a-glance
snapshot of their playing: instruments, skill level, grades, repertoire learnt,
highlights, and more. You fill it in, "save" it, and get a unique URL back.
Visiting that URL renders the profile. Going back and editing generates a
**new** URL rather than mutating the old one.

Use cases: a personal "stats of playing" you track over time, a link to share
with a teacher/band/friend, a bit of fun to show off progress.

## Core architecture decision: no database

The profile data is encoded directly into the URL — a "tokenised" link. There
is no backend datastore. Decoding the URL token reconstructs the data that
populates the profile page. This means:

- Zero server-side persistence, zero DB dependency.
- Only dependency is the UI and its packages.
- Every link is an **immutable snapshot** — editing produces a new link, the
  old one still resolves to the old data forever. This is a deliberate
  feature, not a limitation: it's a natural version history of a player's
  progress.
- If a user loses the URL, the data is gone. That's accepted and intentional
  for this first slice — no recovery mechanism planned.

## Stack: Next.js

Chosen over a plain SPA (e.g. Vite) specifically because:

- Static export / client rendering covers the core "decode URL → render
  profile" flow with no server needed for hosting.
- File-based routing fits `/profile/[token]` cleanly.
- **Server-rendered OG/share-preview routes.** Latest Next.js supports
  server use by default, which solves the "unfurl link in Slack/Discord/
  iMessage shows generic preview" problem — a route can decode the token at
  request time and return dynamic `og:title` / `og:image` per profile. This
  was the deciding factor over a static SPA.

## URL encoding / shortening

No external URL shortener (rejected — that requires a KV/DB lookup service,
which reintroduces the exact dependency the project avoids). Instead:

- Compress the payload itself and keep it self-contained in the URL.
- Prefer a compact binary pack over raw JSON (bitmasks/enums for
  instrument/skill level, varints for grades, indices into a repertoire
  dictionary shipped in the app bundle) rather than paying JSON field-name
  overhead in every link.
- Base64url/base62 encode the binary; gzip/deflate free-text fields
  (`CompressionStream`, no extra library) before encoding.
- Cap free-text fields (bio, notes) explicitly in the UI with a max length —
  don't let users discover the URL-length ceiling via a broken share link.
- Target: structured fields alone should pack to well under ~300 chars
  encoded, comfortably inside safe URL-length limits (~2000 chars) even with
  some bio text included.

## Explicitly deferred / rejected concerns (first slice is "fun", not "secure")

- **No data integrity / signing.** Anyone can hand-craft a URL with any
  grade/instrument claimed. Accepted: this is not a credentialing tool, it's
  a personal share/stats tool. If someone fakes their own profile, that's on
  them.
- **No schema versioning yet.** Field set is still in flux pre-v1. Once the
  fields stabilize into a "version 1," a version marker in the payload
  becomes worth adding so old links keep decoding correctly across schema
  changes. A schema-migration tool for old links is YAGNI until there's
  evidence it's needed.
- **XSS handled by default framework escaping.** Standard JSX interpolation
  is enough for the current field set (grades, instrument names, short
  text). Flagged for care only if a markdown renderer or
  `dangerouslySetInnerHTML` is ever introduced for bio/repertoire notes —
  that would need explicit sanitization.

## What "v1" looks like (informal, not yet scoped as a plan)

- Profile builder form: instruments, skill level, grades, repertoire learnt,
  highlights.
- Save → encode → generate shareable URL.
- Visit URL → decode → render read-only profile view.
- "Create new based on this" → prefill builder from decoded data → new save
  → new URL.
