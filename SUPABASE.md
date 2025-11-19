Supabase setup notes

1) Create a Supabase project at https://app.supabase.com
2) Copy the Project URL and anon/public key into your `.env` as:

VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>

3) Database schema suggestions (create these tables in Supabase SQL editor):

-- users table handled by Supabase Auth

-- bookings table
create table bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  service_type text,
  from_location text,
  to_location text,
  floor_number text,
  move_date timestamp,
  images text[], -- array of image urls
  notes text,
  price_estimate numeric,
  payment_method text,
  payment_status text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- support tickets
create table support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  subject text,
  message text,
  status text default 'open',
  created_at timestamptz default now()
);

4) Enable phone auth (if you want phone OTP) in SupabaseAuth settings and configure SMS provider.

5) After creating tables, configure RLS policies to allow authenticated users to insert/select their own rows.

6) Install client: `npm install @supabase/supabase-js`

7) Start the app: `npm run dev` (or `npm run build && npm run serve` for preview)

If you want, I can create SQL migrations files for these tables next.