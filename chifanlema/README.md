# Chifanlema 吃饭了吗

[![App: Test](https://github.com/cqhung1412/chifanlema/actions/workflows/eas-test.yml/badge.svg)](https://github.com/cqhung1412/chifanlema/actions/workflows/eas-test.yml)
[![App: Release](https://github.com/cqhung1412/chifanlema/actions/workflows/eas-release.yml/badge.svg)](https://github.com/cqhung1412/chifanlema/actions/workflows/eas-release.yml)

A micro-learning mobile app that teaches Mandarin Chinese vocabulary through lock screen widgets and a TikTok-style word feed. Built with React Native (Expo SDK 54) and Supabase.

## Features

- Full-screen vertical snap-scrolling feed with daily words and personalized "For You" tab
- Word detail screens: pinyin, AI TTS pronunciation, stroke order animations (HanziWriter), example sentences with audio
- Shareable 4:5 word cards for social media
- AI-powered search with conversational chat interface
- Lock screen widgets (iOS WidgetKit, Android Jetpack Glance)
- Light/dark theme with system-following
- Bilingual UI: English and Vietnamese
- Auth: email/password, Google, Apple (iOS), anonymous guest mode
- Premium subscription via RevenueCat (ad-free, unlimited AI searches)

## Tech Stack

- **Frontend**: React Native (Expo SDK 54, new architecture), TypeScript, React Navigation v7
- **Backend**: Supabase (PostgreSQL 17, Auth, Edge Functions)
- **State**: Zustand + Supabase JS client
- **Animations**: react-native-reanimated 4.x
- **Widgets**: SwiftUI + WidgetKit (iOS), Jetpack Glance (Android)
- **Stroke Order**: HanziWriter 3.5 (via react-native-webview)
- **Audio**: expo-speech (on-device TTS), expo-audio (AI TTS + Tatoeba sentences)
- **AI TTS**: Edge Function with configurable provider (OpenAI-compatible API)
- **Search**: AI search via Edge Function + vector similarity (pgvector)
- **Ads**: Google AdMob (native ads in feed, rewarded ads for limit bypass)
- **i18n**: react-i18next (English, Vietnamese)
- **Testing**: Vitest 2.x + fast-check 4.x (property-based)
- **Theming**: React Context with light/dark token palettes

## Project Structure

```
├── app/                    # Expo React Native mobile app
│   ├── src/
│   │   ├── components/     # Reusable UI (AudioButton, HanziWriter, ChatUI, etc.)
│   │   ├── screens/        # All app screens
│   │   ├── services/       # Side-effectful modules (Supabase, TTS, ads, feed)
│   │   ├── lib/            # Pure logic (no React, no side effects)
│   │   ├── navigation/     # React Navigation (stack + bottom tabs)
│   │   ├── theme/          # Design tokens, ThemeContext, colors
│   │   ├── store/          # Zustand stores
│   │   ├── i18n/           # Translation files (en.json, vi.json)
│   │   ├── __tests__/      # All tests (unit + property-based)
│   │   └── __mocks__/      # Native module mocks for Vitest
│   ├── ios/                # Native iOS + WidgetKit extension
│   └── android/            # Native Android + Glance widget
├── supabase/
│   ├── migrations/         # SQL migration files
│   ├── functions/          # Edge Functions (search-engine, tts-sentence, tatoeba-*)
│   └── seed.ts             # Vocabulary seeding script
├── crawler/                # Python web crawler (hanzii.net scraper)
├── design/pencil/          # Pencil design files
└── docs/                   # Deployment guides, styling docs
```

## Getting Started

### Prerequisites

- Node.js >= 18
- Docker (for Supabase local dev)
- Expo CLI: `npx expo`
- Supabase CLI: `npx supabase`

### Setup

```bash
# Install app dependencies
cd app && npm install

# Start local Supabase
npx supabase start

# Apply migrations + seed
npx supabase db reset

# Configure environment
cp .env.example .env  # Edit with your Supabase URL + anon key

# Start dev server
npx expo start
```

### Running on device

```bash
npx expo run:android    # Android
npx expo run:ios        # iOS
```

## Commands

### App

```bash
cd app
npm install              # Install dependencies
npm test                 # Run all tests (vitest --run)
npx expo start          # Start Expo dev server
npx expo start --clear  # Start with cache cleared
npx expo run:android    # Build + run on Android
npx expo run:ios        # Build + run on iOS
```

### Supabase

```bash
npx supabase start              # Start local instance
npx supabase db reset           # Apply migrations + seed
npx supabase db push            # Push migrations to remote
npx supabase functions deploy search-engine
npx supabase functions deploy tts-sentence
npx supabase functions deploy tatoeba-sentences
npx supabase functions deploy tatoeba-audio
```

### Crawler

```bash
cd crawler
python -m venv .venv
.venv/Scripts/pip install -r requirements.txt
.venv/Scripts/python -m crawler.main --word 学 --dry-run
.venv/Scripts/python -m pytest tests/ -v
```

## Design System

"Minimalist Monochrome" — warm cream canvas in light mode, warm charcoal in dark mode. Terracotta accent (`#D4916E`). PingFang SC / Noto Sans CJK for Chinese characters.

## Rate Limits (Free Users)

- AI search: 10 queries/day
- AI TTS: 5 generations/day
- Premium users: unlimited

## License

Private — not for redistribution.
