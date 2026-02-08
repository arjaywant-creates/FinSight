create table transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  date date not null default current_date,
  category text not null,
  amount decimal(12, 2) not null,
  description text,
  created_at timestamptz not null default now()
);

alter table transactions enable row level security;

create policy "Users can view their own transactions"
  on transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own transactions"
  on transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own transactions"
  on transactions for update
  using (auth.uid() = user_id);

create policy "Users can delete their own transactions"
  on transactions for delete
  using (auth.uid() = user_id);
