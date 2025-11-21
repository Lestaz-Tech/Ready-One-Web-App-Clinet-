-- ============================================
-- UPDATE: Add Profile Picture Support
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Add new columns to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS profile_picture_url VARCHAR,
ADD COLUMN IF NOT EXISTS has_profile_picture BOOLEAN DEFAULT false;

-- Step 2: Migrate existing profile_picture data to profile_picture_url (if needed)
UPDATE public.users 
SET profile_picture_url = profile_picture,
    has_profile_picture = CASE WHEN profile_picture IS NOT NULL THEN true ELSE false END
WHERE profile_picture IS NOT NULL;

-- Step 3: Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_has_profile_picture ON public.users(has_profile_picture);
CREATE INDEX IF NOT EXISTS idx_users_profile_picture_url ON public.users(profile_picture_url);

-- Step 4: Optional - Drop old profile_picture column if you want (keep if you need backward compatibility)
-- ALTER TABLE public.users DROP COLUMN profile_picture;

-- Step 5: Update the updated_at trigger (if not exists)
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_timestamp ON public.users;

CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION update_users_updated_at();

-- ============================================
-- STORAGE BUCKET SETUP
-- ============================================
-- Create profile pictures storage bucket
-- Go to Supabase Dashboard > Storage > New Bucket
-- Bucket name: profile_pictures
-- Make it private or public based on your needs

-- If you want to set this via SQL (optional):
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('profile_pictures', 'profile_pictures', false)
-- ON CONFLICT (id) DO NOTHING;

-- ============================================
-- RLS POLICIES FOR STORAGE
-- ============================================
-- Run these in Supabase SQL Editor to allow users to upload their profile pictures:

-- Allow users to upload to their own folder
CREATE POLICY "Users can upload their own profile picture"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profile_pictures' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to read their own profile picture
CREATE POLICY "Users can read their own profile picture"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile_pictures');

-- Allow users to update their own profile picture
CREATE POLICY "Users can update their own profile picture"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profile_pictures' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own profile picture
CREATE POLICY "Users can delete their own profile picture"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profile_pictures' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
