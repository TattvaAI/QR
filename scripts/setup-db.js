// Setup script to initialize database
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hscawdrcrpknowijwvsu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzY2F3ZHJjcnBrbm93aWp3dnN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MjQ5ODksImV4cCI6MjA4MzIwMDk4OX0.VBJxJxuDZMxQzWHGMVLN74-hZao30kO0gG0aX_7bUe8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const students = [
    { name: 'Shivansh', email: 'shivansh@college.edu', roll_number: 'CS2024001', department: 'Computer Science', year: 2, totp_secret: 'JBSWY3DPEHPK3PXP' },
    { name: 'Aryan', email: 'aryan@college.edu', roll_number: 'CS2024002', department: 'Computer Science', year: 2, totp_secret: 'GEZDGNBVGY3TQOJQ' },
    { name: 'Nisha', email: 'nisha@college.edu', roll_number: 'CS2024003', department: 'Computer Science', year: 2, totp_secret: 'MFRGGZDFMY4TQNBZ' },
    { name: 'Bhawana', email: 'bhawana@college.edu', roll_number: 'CS2024004', department: 'Computer Science', year: 2, totp_secret: 'NBSWY3DPEHPK3PXQ' },
    { name: 'Khushi Dhiman', email: 'khushi.dhiman@college.edu', roll_number: 'CS2024005', department: 'Computer Science', year: 2, totp_secret: 'OBQXG43XN5ZGI5DZ' },
    { name: 'Aarzoo', email: 'aarzoo@college.edu', roll_number: 'CS2024006', department: 'Computer Science', year: 2, totp_secret: 'KRSXG5CTMVRXEZLU' },
    { name: 'Rahul Sharma', email: 'rahul.sharma@college.edu', roll_number: 'CS2024007', department: 'Computer Science', year: 3, totp_secret: 'HXDMVJECJJWSRB3H' },
    { name: 'Priya Singh', email: 'priya.singh@college.edu', roll_number: 'EC2024001', department: 'Electronics', year: 2, totp_secret: 'JZSXE5LZNFWWK3TB' },
    { name: 'Amit Kumar', email: 'amit.kumar@college.edu', roll_number: 'ME2024001', department: 'Mechanical', year: 1, totp_secret: 'KNQW24DPNVYCEIDP' },
    { name: 'Sneha Patel', email: 'sneha.patel@college.edu', roll_number: 'CS2024008', department: 'Computer Science', year: 4, totp_secret: 'LFVWY3DPOVWXI2LB' },
    { name: 'Vikram Verma', email: 'vikram.verma@college.edu', roll_number: 'CE2024001', department: 'Civil', year: 3, totp_secret: 'MNBVC43XOQZGI4DM' },
    { name: 'Anjali Gupta', email: 'anjali.gupta@college.edu', roll_number: 'IT2024001', department: 'Information Technology', year: 2, totp_secret: 'PFQWG43CPRZGK3DS' },
    { name: 'Rohit Mehta', email: 'rohit.mehta@college.edu', roll_number: 'CS2024009', department: 'Computer Science', year: 1, totp_secret: 'QRSTU2DPEHPK5PXR' },
    { name: 'Kavya Joshi', email: 'kavya.joshi@college.edu', roll_number: 'EC2024002', department: 'Electronics', year: 3, totp_secret: 'RSTXG5BONVRHE3LF' },
    { name: 'Deepak Yadav', email: 'deepak.yadav@college.edu', roll_number: 'ME2024002', department: 'Mechanical', year: 2, totp_secret: 'STUVW3DPMNPK4PYS' },
];

async function setup() {
    console.log('🚀 Setting up database...\n');

    // Insert students
    console.log('📝 Inserting students...');
    const { data, error } = await supabase
        .from('students')
        .upsert(students, { onConflict: 'email' })
        .select();

    if (error) {
        console.error('❌ Error inserting students:', error.message);
        console.log('\n⚠️  You need to create the tables first!');
        console.log('Go to Supabase Dashboard → SQL Editor and run this:\n');
        console.log(`
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    department VARCHAR(100) DEFAULT 'Computer Science',
    year INTEGER DEFAULT 1,
    totp_secret VARCHAR(32) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    status VARCHAR(10) NOT NULL CHECK (status IN ('GRANTED', 'DENIED')),
    guard_note TEXT,
    scanned_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read on students
CREATE POLICY "public_read_students" ON students FOR SELECT USING (true);

-- Allow public insert/read on access_logs  
CREATE POLICY "public_insert_access_logs" ON access_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "public_read_access_logs" ON access_logs FOR SELECT USING (true);
        `);
        return;
    }

    console.log(`✅ Inserted ${data.length} students!\n`);
    
    // Display students
    console.log('📋 Students in database:');
    console.log('─'.repeat(70));
    data.forEach((s, i) => {
        console.log(`${i + 1}. ${s.name.padEnd(20)} | ${s.roll_number} | ${s.totp_secret}`);
    });
    console.log('─'.repeat(70));
    console.log('\n✅ Setup complete! Your database is ready.');
}

setup();
