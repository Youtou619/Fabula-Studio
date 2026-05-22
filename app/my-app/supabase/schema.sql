-- ==========================================
-- Schema Fabula Studio - Supabase
-- ==========================================

-- Enable RLS (Row Level Security) on all tables
-- Auth handled by Supabase Auth (magic link, Google, GitHub)

-- ==========================================
-- TABLE: projects
-- ==========================================
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  description text,
  type text default 'novel' check (type in ('novel', 'rpg', 'screenplay', 'game', 'other')),
  status text default 'draft' check (status in ('draft', 'active', 'completed', 'archived')),
  settings jsonb default '{}'::jsonb
);

-- RLS: users can only see their own projects
alter table public.projects enable row level security;

create policy "Users can view own projects" on public.projects
  for select using (auth.uid() = user_id);

create policy "Users can create own projects" on public.projects
  for insert with check (auth.uid() = user_id);

create policy "Users can update own projects" on public.projects
  for update using (auth.uid() = user_id);

create policy "Users can delete own projects" on public.projects
  for delete using (auth.uid() = user_id);

-- ==========================================
-- TABLE: characters
-- ==========================================
create table if not exists public.characters (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  project_id uuid references public.projects on delete cascade not null,
  name text not null,
  role text not null default 'secondary',
  avatar_url text,
  description text,
  motivation text,
  secret text,
  tags text[] default '{}'::text[],
  color text default '#6b7280',
  metadata jsonb default '{}'::jsonb,
  order_index integer default 0
);

alter table public.characters enable row level security;

create policy "Users can view characters of own projects" on public.characters
  for select using (
    exists (select 1 from public.projects where id = characters.project_id and user_id = auth.uid())
  );

create policy "Users can manage characters of own projects" on public.characters
  for all using (
    exists (select 1 from public.projects where id = characters.project_id and user_id = auth.uid())
  );

-- ==========================================
-- TABLE: locations
-- ==========================================
create table if not exists public.locations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  project_id uuid references public.projects on delete cascade not null,
  name text not null,
  type text not null default 'location',
  description text,
  parent_id uuid references public.locations(id) on delete set null,
  metadata jsonb default '{}'::jsonb,
  order_index integer default 0
);

alter table public.locations enable row level security;

create policy "Users can view locations of own projects" on public.locations
  for select using (
    exists (select 1 from public.projects where id = locations.project_id and user_id = auth.uid())
  );

create policy "Users can manage locations of own projects" on public.locations
  for all using (
    exists (select 1 from public.projects where id = locations.project_id and user_id = auth.uid())
  );

-- ==========================================
-- TABLE: events
-- ==========================================
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  project_id uuid references public.projects on delete cascade not null,
  title text not null,
  date_label text,
  description text,
  chapter integer,
  character_ids uuid[] default '{}'::uuid[],
  location_ids uuid[] default '{}'::uuid[],
  metadata jsonb default '{}'::jsonb,
  order_index integer default 0
);

alter table public.events enable row level security;

create policy "Users can view events of own projects" on public.events
  for select using (
    exists (select 1 from public.projects where id = events.project_id and user_id = auth.uid())
  );

create policy "Users can manage events of own projects" on public.events
  for all using (
    exists (select 1 from public.projects where id = events.project_id and user_id = auth.uid())
  );

-- ==========================================
-- TABLE: relations
-- ==========================================
create table if not exists public.relations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  project_id uuid references public.projects on delete cascade not null,
  source_id uuid references public.characters(id) on delete cascade not null,
  target_id uuid references public.characters(id) on delete cascade not null,
  type text not null default 'neutral',
  label text not null,
  metadata jsonb default '{}'::jsonb
);

alter table public.relations enable row level security;

create policy "Users can view relations of own projects" on public.relations
  for select using (
    exists (select 1 from public.projects where id = relations.project_id and user_id = auth.uid())
  );

create policy "Users can manage relations of own projects" on public.relations
  for all using (
    exists (select 1 from public.projects where id = relations.project_id and user_id = auth.uid())
  );

-- ==========================================
-- TABLE: chapters
-- ==========================================
create table if not exists public.chapters (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  project_id uuid references public.projects on delete cascade not null,
  title text not null,
  number integer not null default 1,
  content text,
  summary text,
  character_ids uuid[] default '{}'::uuid[],
  event_ids uuid[] default '{}'::uuid[],
  status text default 'draft' check (status in ('draft', 'revised', 'final')),
  word_count integer default 0,
  metadata jsonb default '{}'::jsonb
);

alter table public.chapters enable row level security;

create policy "Users can view chapters of own projects" on public.chapters
  for select using (
    exists (select 1 from public.projects where id = chapters.project_id and user_id = auth.uid())
  );

create policy "Users can manage chapters of own projects" on public.chapters
  for all using (
    exists (select 1 from public.projects where id = chapters.project_id and user_id = auth.uid())
  );

-- ==========================================
-- INDEXES
-- ==========================================
create index if not exists idx_characters_project on public.characters(project_id);
create index if not exists idx_locations_project on public.locations(project_id);
create index if not exists idx_events_project on public.events(project_id);
create index if not exists idx_relations_project on public.relations(project_id);
create index if not exists idx_chapters_project on public.chapters(project_id);
