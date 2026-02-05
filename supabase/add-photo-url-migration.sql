-- Migration: Add photo_url column to students table
-- Run this in Supabase SQL Editor if you already have the students table created

ALTER TABLE students ADD COLUMN IF NOT EXISTS photo_url TEXT;
