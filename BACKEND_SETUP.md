# Ready One Movers - Backend Setup Guide

## Database Schema (Supabase PostgreSQL)

Run these SQL commands in your Supabase SQL editor to set up the database:

```sql
-- ============================================
-- 1. BOOKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_type VARCHAR(255) NOT NULL,
  from_location VARCHAR(500) NOT NULL,
  to_location VARCHAR(500) NOT NULL,
  floor_number VARCHAR(50),
  move_date TIMESTAMP,
  notes TEXT,
  price_estimate DECIMAL(10, 2),
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, in_progress, completed, cancelled
  images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);

-- ============================================
-- 2. COMPANY USERS TABLE (Staff/Admin)
-- ============================================
CREATE TABLE IF NOT EXISTS public.company_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  role VARCHAR(50) DEFAULT 'staff', -- admin, manager, staff
  team_name VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_company_users_user_id ON public.company_users(user_id);
CREATE INDEX IF NOT EXISTS idx_company_users_role ON public.company_users(role);
CREATE INDEX IF NOT EXISTS idx_company_users_team_name ON public.company_users(team_name);

-- ============================================
-- 3. BOOKING ASSIGNMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.booking_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  assigned_to_user_id UUID NOT NULL REFERENCES public.company_users(user_id) ON DELETE CASCADE,
  team_name VARCHAR(100),
  assigned_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'assigned', -- assigned, in_progress, completed, cancelled
  notes TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_booking_assignments_booking_id ON public.booking_assignments(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_assignments_assigned_to ON public.booking_assignments(assigned_to_user_id);
CREATE INDEX IF NOT EXISTS idx_booking_assignments_status ON public.booking_assignments(status);

-- ============================================
-- 4. SUPPORT TICKETS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'open', -- open, in_progress, resolved, closed
  priority VARCHAR(50) DEFAULT 'medium', -- low, medium, high, urgent
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON public.support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_priority ON public.support_tickets(priority);

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Bookings RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own bookings"
  ON public.bookings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookings"
  ON public.bookings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON public.bookings
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Company users can see all bookings (for assignment dashboard)
CREATE POLICY "Company staff can see all bookings"
  ON public.bookings
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.company_users
    WHERE user_id = auth.uid() AND is_active = TRUE
  ));

-- Support Tickets RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own tickets"
  ON public.support_tickets
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tickets"
  ON public.support_tickets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Company staff can see all tickets
CREATE POLICY "Company staff can see all tickets"
  ON public.support_tickets
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.company_users
    WHERE user_id = auth.uid() AND is_active = TRUE
  ));

-- Booking Assignments RLS
ALTER TABLE public.booking_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Assigned staff can see their assignments"
  ON public.booking_assignments
  FOR SELECT
  USING (assigned_to_user_id = auth.uid());

CREATE POLICY "Company staff can manage assignments"
  ON public.booking_assignments
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.company_users
    WHERE user_id = auth.uid() AND role IN ('admin', 'manager')
  ));

-- Company Users RLS
ALTER TABLE public.company_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own company profile"
  ON public.company_users
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage company users"
  ON public.company_users
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.company_users cu
    WHERE cu.user_id = auth.uid() AND cu.role = 'admin'
  ));
```

## Backend API Structure

### REST API Endpoints

#### Client Endpoints (Protected - Client Auth)

```
POST   /api/bookings               - Create new booking
GET    /api/bookings               - List user's bookings
GET    /api/bookings/:id           - Get booking details
PUT    /api/bookings/:id           - Update booking
DELETE /api/bookings/:id           - Cancel booking

POST   /api/support-tickets        - Create support ticket
GET    /api/support-tickets        - List user's tickets
GET    /api/support-tickets/:id    - Get ticket details
```

#### Company Dashboard Endpoints (Protected - Company Auth)

```
GET    /api/company/bookings               - List all bookings (with filters)
GET    /api/company/bookings/:id           - Get booking details
PUT    /api/company/bookings/:id/assign    - Assign booking to staff
PUT    /api/company/bookings/:id/status    - Update booking status
GET    /api/company/assignments            - List staff assignments
GET    /api/company/support-tickets        - List all support tickets
PUT    /api/company/support-tickets/:id    - Update ticket (assign, resolve)
GET    /api/company/dashboard/stats        - Dashboard metrics
```

#### Company User Management

```
GET    /api/company/users                  - List company staff
POST   /api/company/users                  - Invite new staff member
PUT    /api/company/users/:id              - Update staff profile
DELETE /api/company/users/:id              - Deactivate staff
```

## Environment Variables (.env)

```
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Backend API (if running separately)
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://...

# JWT Secret (for token generation)
JWT_SECRET=your-super-secret-jwt-key
```

## Setup Steps

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create a new project
   - Note your URL and Anon Key

2. **Run Database Schema**
   - Copy the SQL above
   - Paste into Supabase SQL Editor
   - Execute all commands

3. **Configure Auth**
   - Enable Phone Auth in Supabase Auth settings
   - Set up phone sign-up templates

4. **Deploy Backend API**
   - Set up Node.js/Express server (see backend folder)
   - Deploy to Vercel, Railway, or similar
   - Set environment variables in deployment platform

5. **Update Frontend .env**
   - Add your Supabase URL and keys
   - Add backend API base URL

## Security Notes

- RLS policies ensure users only see their own data
- Company staff can only see/manage bookings
- Service role key should NEVER be exposed to frontend
- Use JWT tokens for API requests from backend
- All sensitive operations require auth

