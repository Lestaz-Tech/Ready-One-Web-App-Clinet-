-- Check Bookings Table Structure
-- Run this in Supabase SQL Editor to verify your bookings table exists

-- 1. Check if bookings table exists
SELECT EXISTS (
  SELECT 1 FROM information_schema.tables 
  WHERE table_schema = 'public' AND table_name = 'bookings'
) AS bookings_table_exists;

-- 2. Get bookings table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'bookings'
ORDER BY ordinal_position;

-- 3. Count total bookings
SELECT COUNT(*) as total_bookings FROM public.bookings;

-- 4. Get recent bookings
SELECT 
  id, 
  user_id, 
  service_type, 
  from_location, 
  to_location, 
  booking_date, 
  status, 
  created_at
FROM public.bookings
ORDER BY created_at DESC
LIMIT 10;

-- 5. Check bookings for specific user (replace with actual user_id)
-- SELECT * FROM public.bookings WHERE user_id = 'YOUR_USER_ID' LIMIT 5;

-- 6. Enable RLS and set policies if needed
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own bookings
CREATE POLICY "Users can view own bookings" 
  ON public.bookings FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy: Users can create bookings
CREATE POLICY "Users can create bookings" 
  ON public.bookings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own bookings
CREATE POLICY "Users can update own bookings" 
  ON public.bookings FOR UPDATE 
  USING (auth.uid() = user_id);

-- 7. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at);
