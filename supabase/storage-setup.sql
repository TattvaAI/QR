-- Supabase Storage Setup for Student Photos
-- Run this in Supabase SQL Editor

-- Create storage bucket for student photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('student-photos', 'student-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to photos
CREATE POLICY "Public Access to Student Photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'student-photos');

-- Only allow service role to upload/delete photos (admin only)
CREATE POLICY "Service Role Upload Access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'student-photos' AND auth.role() = 'service_role');

CREATE POLICY "Service Role Delete Access"
ON storage.objects FOR DELETE
USING (bucket_id = 'student-photos' AND auth.role() = 'service_role');
