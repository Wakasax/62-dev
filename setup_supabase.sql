-- Rode isso no Supabase: Project > SQL Editor > New query > Run

create table diary_pages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  title text default '',
  body text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table agenda_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  title text not null,
  event_date date,
  done boolean default false,
  created_at timestamptz default now()
);

-- Segurança: cada usuário só vê e edita os próprios dados
alter table diary_pages enable row level security;
alter table agenda_events enable row level security;

create policy "own diary pages" on diary_pages
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own agenda events" on agenda_events
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
