-- Gatepass Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    department VARCHAR(100) DEFAULT 'Computer Science',
    year INTEGER DEFAULT 1 CHECK (year >= 1 AND year <= 4),
    totp_secret VARCHAR(32) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Access logs table
CREATE TABLE IF NOT EXISTS access_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    status VARCHAR(10) NOT NULL CHECK (status IN ('GRANTED', 'DENIED')),
    guard_note TEXT, -- CURRENTLY USED TO STORE TOTP TOKEN FOR REPLAY PROTECTION
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_students_roll_number ON students(roll_number);
CREATE INDEX IF NOT EXISTS idx_students_totp_secret ON students(totp_secret);
CREATE INDEX IF NOT EXISTS idx_access_logs_student_id ON access_logs(student_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_scanned_at ON access_logs(scanned_at DESC);
CREATE INDEX IF NOT EXISTS idx_access_logs_replay_protection ON access_logs(student_id, guard_note);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_students_updated_at ON students;
CREATE TRIGGER update_students_updated_at
    BEFORE UPDATE ON students
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_logs ENABLE ROW LEVEL SECURITY;

-- Policies for public access (adjust as needed for your security requirements)
-- Allow read access to students for verification
CREATE POLICY "Allow public read access to students" ON students
    FOR SELECT USING (true);

-- Allow insert access to access_logs
CREATE POLICY "Allow public insert to access_logs" ON access_logs
    FOR INSERT WITH CHECK (true);

-- Allow read access to access_logs
CREATE POLICY "Allow public read access to access_logs" ON access_logs
    FOR SELECT USING (true);
