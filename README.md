# 🎵 MusicNerds

> A social platform for music enthusiasts to rate albums, track listening stats, join communities, and discover new music together.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://musicnerds.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Backend | Supabase (PostgreSQL + Auth) |
| Icons | Lucide React |
| Deploy | Vercel |
| Music APIs | Last.fm + Spotify (coming soon) |

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/MatheusMarques13/musicnerds.git
cd musicnerds
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Fill in your keys from:
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Last.fm API](https://www.last.fm/api/account/create)
- [Spotify Developer](https://developer.spotify.com/dashboard)

### 3. Database Setup

Go to your Supabase project → SQL Editor → paste the contents of `supabase/schema.sql` and run.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── layout/           # Sidebar, Header
│   ├── ui/               # AlbumCard, StatCard, ActivityItem
│   └── views/            # HomeView, ExploreView, etc.
├── lib/
│   ├── supabase/         # Client, server, middleware helpers
│   └── utils.ts          # cn() utility
└── types/                # TypeScript interfaces
supabase/
└── schema.sql            # Full database schema
```

## 🛣️ Roadmap

- [x] Next.js 14 + TypeScript + Tailwind migration
- [x] Component architecture (Sidebar, AlbumCard, StatCard, ActivityItem)
- [x] Supabase schema (profiles, albums, ratings, scrobbles, lists, communities)
- [x] Supabase client/server/middleware setup
- [ ] Authentication (email + social login)
- [ ] Last.fm API integration
- [ ] Spotify API integration
- [ ] Real-time activity feed
- [ ] PWA support

## 👨‍💻 Author

**Matheus Marques** — [@MatheusMarques13](https://github.com/MatheusMarques13)

---

**Status**: 🚧 In Development | **Version**: 0.2.0 | **Last Updated**: March 2026
