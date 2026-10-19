# Zoppy

A tiny, squishy, original-character portfolio: **Zoppy**, a curious light-violet slime with a talent for making the world feel lighter.

**Live site:** https://custom-character-web-55oi.bolt.host

## Features

- Squeezable, wobbly Zoppy: press to squish, let go to jiggle, drag to stretch (spring physics)
- Eyes that follow your cursor across the whole page
- Synthesized giggle sound (Web Audio API) with a sound on/off toggle
- Day and night mode
- Guestbook that saves notes to Supabase
- Responsive layout, keyboard-accessible, and respects reduced-motion settings

## Built with

React 18 · TypeScript · Vite · Tailwind CSS (base styles) · Lucide icons · Supabase

## Run it locally

```bash
npm install
npm run dev
```

Create a `.env.local` file in the project root:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### Guestbook table (run once in the Supabase SQL editor)

```sql
create table public.guestbook_notes (
  id uuid primary key default gen_random_uuid(),
  message text not null check (char_length(message) between 1 and 280),
  created_at timestamptz not null default now()
);

alter table public.guestbook_notes enable row level security;

create policy "Anyone can leave a note"
  on public.guestbook_notes
  for insert
  to anon
  with check (true);
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript checker |

## Project structure

```
src/
├── components/   page sections (Nav, Hero, Story, Projects, Guestbook, ...)
├── hooks/        useGiggle (sound), useJelly (squish physics), useEyeTracking
├── data/         text content for traits and projects
├── lib/          Supabase client
├── App.tsx
└── index.css
```

