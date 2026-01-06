-- Seed Data for Gatepass System
-- Run this AFTER schema.sql in Supabase SQL Editor

-- Insert students with unique TOTP secrets
INSERT INTO students (name, email, roll_number, department, year, totp_secret) VALUES
    -- Main students (requested)
    ('Shivansh', 'shivansh@college.edu', 'CS2024001', 'Computer Science', 2, 'JBSWY3DPEHPK3PXP'),
    ('Aryan', 'aryan@college.edu', 'CS2024002', 'Computer Science', 2, 'GEZDGNBVGY3TQOJQ'),
    ('Nisha', 'nisha@college.edu', 'CS2024003', 'Computer Science', 2, 'MFRGGZDFMY4TQNBZ'),
    ('Bhawana', 'bhawana@college.edu', 'CS2024004', 'Computer Science', 2, 'NBSWY3DPEHPK3PXQ'),
    ('Khushi Dhiman', 'khushi.dhiman@college.edu', 'CS2024005', 'Computer Science', 2, 'OBQXG43XN5ZGI5DZ'),
    ('Aarzoo', 'aarzoo@college.edu', 'CS2024006', 'Computer Science', 2, 'KRSXG5CTMVRXEZLU'),
    
    -- Additional random students
    ('Rahul Sharma', 'rahul.sharma@college.edu', 'CS2024007', 'Computer Science', 3, 'HXDMVJECJJWSRB3H'),
    ('Priya Singh', 'priya.singh@college.edu', 'EC2024001', 'Electronics', 2, 'JZSXE5LZNFWWK3TB'),
    ('Amit Kumar', 'amit.kumar@college.edu', 'ME2024001', 'Mechanical', 1, 'KNQW24DPNVYCEIDP'),
    ('Sneha Patel', 'sneha.patel@college.edu', 'CS2024008', 'Computer Science', 4, 'LFVWY3DPOVWXI2LB'),
    ('Vikram Verma', 'vikram.verma@college.edu', 'CE2024001', 'Civil', 3, 'MNBVC43XOQZGI4DM'),
    ('Anjali Gupta', 'anjali.gupta@college.edu', 'IT2024001', 'Information Technology', 2, 'PFQWG43CPRZGK3DS'),
    ('Rohit Mehta', 'rohit.mehta@college.edu', 'CS2024009', 'Computer Science', 1, 'QRSTU2DPEHPK5PXR'),
    ('Kavya Joshi', 'kavya.joshi@college.edu', 'EC2024002', 'Electronics', 3, 'RSTXG5BONVRHE3LF'),
    ('Deepak Yadav', 'deepak.yadav@college.edu', 'ME2024002', 'Mechanical', 2, 'STUVW3DPMNPK4PYS')
ON CONFLICT (email) DO NOTHING;

-- Insert some sample access logs
INSERT INTO access_logs (student_id, status, scanned_at) 
SELECT 
    id, 
    'GRANTED',
    NOW() - INTERVAL '1 hour'
FROM students WHERE name = 'Shivansh';

INSERT INTO access_logs (student_id, status, scanned_at) 
SELECT 
    id, 
    'GRANTED',
    NOW() - INTERVAL '2 hours'
FROM students WHERE name = 'Aryan';

INSERT INTO access_logs (student_id, status, scanned_at) 
SELECT 
    id, 
    'DENIED',
    NOW() - INTERVAL '3 hours'
FROM students WHERE name = 'Nisha';

INSERT INTO access_logs (student_id, status, scanned_at) 
SELECT 
    id, 
    'GRANTED',
    NOW() - INTERVAL '30 minutes'
FROM students WHERE name = 'Khushi Dhiman';
