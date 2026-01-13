# The Streets of New York (Expo + React Native)

Mobile-first Expo app (iOS/Android/Web) that visually simulates people walking across a NYC crosswalk when character buttons are clicked.

## Run locally

- Install dependencies:

```bash
npm install
```

- Start the dev server:

```bash
npm run start
```

- Run on web:

```bash
npm run web
```

## Build for web (static export)

This project is configured for Expo Web static export (good for Vercel):

```bash
npm run export:web
```

The generated site is written to `dist/`.

## Deploy to Vercel

On Vercel, configure:

- **Framework Preset**: “Other”
- **Install Command**: `npm install`
- **Build Command**: `npm run export:web`
- **Output Directory**: `dist`

This repo also includes `vercel.json` with the same defaults.

## Project structure

- `App.tsx`: app shell + state management (spawn walkers, track counts, remove after exit)
- `src/components/StreetScene.tsx`: skyline + storefronts + crosswalk stage
- `src/components/Walker.tsx`: per-instance walking + bobbing animation and cleanup
- `src/components/CharacterSprite.tsx`: lightweight placeholder character drawings (no external assets)
- `src/components/CharacterButtonRow.tsx`: 5 character buttons with spawn counts
- `src/types/characters.ts`: character catalog + palettes

