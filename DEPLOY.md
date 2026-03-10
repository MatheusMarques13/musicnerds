# 🚀 Deploy Guide — MusicNerds on Vercel

This guide walks you through deploying MusicNerds from zero to production.

---

## 1. Supabase Setup

### Create a project
1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Choose a name (e.g. `musicnerds`) and a strong database password
3. Select region: **South America (São Paulo)**

### Run the schema
1. In your project dashboard → **SQL Editor**
2. Paste the entire contents of `supabase/schema.sql`
3. Click **Run**

### Get your keys
Go to **Project Settings → API**:
- `NEXT_PUBLIC_SUPABASE_URL` → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` → service_role key (keep secret!)

### Enable Google Auth (optional)
1. **Authentication → Providers → Google**
2. Enable and paste your Google OAuth credentials
3. Add redirect URL: `https://your-app.vercel.app/auth/callback`

---

## 2. Last.fm API Key

1. Go to [last.fm/api/account/create](https://www.last.fm/api/account/create)
2. Fill in the form — **Application name**: MusicNerds
3. Copy your **API Key** and **Shared Secret**

---

## 3. Spotify API Credentials

1. Go to [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
2. **Create App** → fill in name and description
3. Add redirect URI: `https://your-app.vercel.app`
4. Copy **Client ID** and **Client Secret**

---

## 4. Deploy to Vercel

### Option A — Vercel CLI (recommended)
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option B — GitHub Integration
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `MatheusMarques13/musicnerds` repo
3. Framework: **Next.js** (auto-detected)
4. Add all environment variables (step 5 below)
5. Click **Deploy**

---

## 5. Environment Variables

In your Vercel project → **Settings → Environment Variables**, add:

| Variable | Value | Environments |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | All |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Production, Preview |
| `LASTFM_API_KEY` | Last.fm API key | All |
| `LASTFM_API_SECRET` | Last.fm shared secret | All |
| `SPOTIFY_CLIENT_ID` | Spotify client ID | All |
| `SPOTIFY_CLIENT_SECRET` | Spotify client secret | All |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | Production |

---

## 6. Post-Deploy Checklist

- [ ] Visit your Vercel URL and confirm the app loads
- [ ] Test search (requires Spotify + Last.fm keys)
- [ ] Test sign up / sign in (requires Supabase)
- [ ] In Supabase → **Authentication → URL Configuration**:
  - Site URL: `https://your-app.vercel.app`
  - Redirect URLs: `https://your-app.vercel.app/auth/callback`
- [ ] Test Google login (if enabled)
- [ ] Check `/api/albums/new-releases` returns data

---

## 7. Custom Domain (optional)

1. Vercel project → **Settings → Domains**
2. Add your domain (e.g. `musicnerds.app`)
3. Update DNS with the CNAME/A records provided
4. Update `NEXT_PUBLIC_APP_URL` and Supabase redirect URLs accordingly

---

## Local Development

```bash
git clone https://github.com/MatheusMarques13/musicnerds.git
cd musicnerds
npm install
cp .env.example .env.local
# Fill in .env.local with your keys
npm run dev
# → http://localhost:3000
```

---

**Region**: The `vercel.json` is set to `gru1` (São Paulo) for lowest latency from Brazil 🇧🇷
