-- MusicNerds Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users profile (extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text,
  avatar_url text,
  bio text,
  total_scrobbles integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Albums
create table public.albums (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  artist text not null,
  cover_url text,
  release_year integer,
  genre text,
  spotify_id text unique,
  lastfm_mbid text unique,
  avg_rating numeric(3,2) default 0,
  total_ratings integer default 0,
  created_at timestamptz default now()
);

-- Ratings
create table public.ratings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  album_id uuid references public.albums(id) on delete cascade,
  rating numeric(2,1) check (rating >= 0.5 and rating <= 5.0),
  review text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, album_id)
);

-- Scrobbles
create table public.scrobbles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  track_name text not null,
  artist text not null,
  album text,
  scrobbled_at timestamptz default now()
);

-- Lists
create table public.lists (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  creator_id uuid references public.profiles(id) on delete cascade,
  is_collaborative boolean default false,
  created_at timestamptz default now()
);

-- List items
create table public.list_albums (
  list_id uuid references public.lists(id) on delete cascade,
  album_id uuid references public.albums(id) on delete cascade,
  position integer,
  added_by uuid references public.profiles(id),
  added_at timestamptz default now(),
  primary key (list_id, album_id)
);

-- Communities
create table public.communities (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  genre text,
  cover_url text,
  member_count integer default 0,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- Community members
create table public.community_members (
  community_id uuid references public.communities(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamptz default now(),
  primary key (community_id, user_id)
);

-- Follows
create table public.follows (
  follower_id uuid references public.profiles(id) on delete cascade,
  following_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.albums enable row level security;
alter table public.ratings enable row level security;
alter table public.scrobbles enable row level security;
alter table public.lists enable row level security;
alter table public.list_albums enable row level security;
alter table public.communities enable row level security;
alter table public.community_members enable row level security;
alter table public.follows enable row level security;

-- RLS Policies
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Albums are viewable by everyone" on public.albums for select using (true);

create policy "Ratings are viewable by everyone" on public.ratings for select using (true);
create policy "Users can manage own ratings" on public.ratings for all using (auth.uid() = user_id);

create policy "Scrobbles viewable by everyone" on public.scrobbles for select using (true);
create policy "Users can insert own scrobbles" on public.scrobbles for insert with check (auth.uid() = user_id);

create policy "Lists are viewable by everyone" on public.lists for select using (true);
create policy "Users can manage own lists" on public.lists for all using (auth.uid() = creator_id);

create policy "Communities are viewable by everyone" on public.communities for select using (true);

create policy "Follows viewable by everyone" on public.follows for select using (true);
create policy "Users can manage own follows" on public.follows for all using (auth.uid() = follower_id);

-- Auto-update avg_rating on albums when a rating is inserted/updated
create or replace function update_album_avg_rating()
returns trigger as $$
begin
  update public.albums
  set 
    avg_rating = (select avg(rating) from public.ratings where album_id = NEW.album_id),
    total_ratings = (select count(*) from public.ratings where album_id = NEW.album_id)
  where id = NEW.album_id;
  return NEW;
end;
$$ language plpgsql security definer;

create trigger on_rating_change
  after insert or update on public.ratings
  for each row execute procedure update_album_avg_rating();
