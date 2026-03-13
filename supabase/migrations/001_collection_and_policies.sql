-- MusicNerds Migration 001
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ---------------------------------------------------------------

-- 1. Collection table (spotify_id-based, no FK to albums required)
create table if not exists public.collection (
  id         uuid default uuid_generate_v4() primary key,
  user_id    uuid references public.profiles(id) on delete cascade not null,
  spotify_id text not null,
  album_title text,
  artist     text,
  cover_url  text,
  release_year text,
  status     text default 'listened'
             check (status in ('listened', 'want_to_listen', 'favorite')),
  added_at   timestamptz default now(),
  unique(user_id, spotify_id)
);

alter table public.collection enable row level security;

create policy "Users can view own collection"
  on public.collection for select using (auth.uid() = user_id);

create policy "Users can manage own collection"
  on public.collection for all using (auth.uid() = user_id);

-- 2. Allow new users to insert their profile row (created during sign-up)
do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'profiles' and policyname = 'Users can insert own profile'
  ) then
    execute 'create policy "Users can insert own profile"
      on public.profiles for insert with check (auth.uid() = id)';
  end if;
end $$;

-- 3. Allow authenticated users to upsert albums (needed for rating flow)
do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'albums' and policyname = 'Authenticated users can insert albums'
  ) then
    execute 'create policy "Authenticated users can insert albums"
      on public.albums for insert with check (auth.uid() is not null)';
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'albums' and policyname = 'Authenticated users can update albums'
  ) then
    execute 'create policy "Authenticated users can update albums"
      on public.albums for update using (auth.uid() is not null)';
  end if;
end $$;

-- 4. Community members policies
do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'community_members' and policyname = 'Community members viewable by everyone'
  ) then
    execute 'create policy "Community members viewable by everyone"
      on public.community_members for select using (true)';
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'community_members' and policyname = 'Users can manage own community membership'
  ) then
    execute 'create policy "Users can manage own community membership"
      on public.community_members for all using (auth.uid() = user_id)';
  end if;
end $$;

-- 5. List album policies (missing from original schema)
do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'list_albums' and policyname = 'List albums viewable by everyone'
  ) then
    execute 'create policy "List albums viewable by everyone"
      on public.list_albums for select using (true)';
  end if;
end $$;
