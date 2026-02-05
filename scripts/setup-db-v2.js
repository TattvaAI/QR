const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hscawdrcrpknowijwvsu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzY2F3ZHJjcnBrbm93aWp3dnN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzYyNDk4OSwiZXhwIjoyMDgzMjAwOTg5fQ.Rj8fLy7yLlJD0Hi82Tm-xMC6cqoG8Tg7IXyrisd-lgY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

    // Check if students table exists
    const { data: checkTable, error: checkError } = await supabase
        .from('students')
        .select('id')
        .limit(1);

    if (checkError && checkError.code === '42P01') {
        console.log('❌ Students table does not exist yet.');
        console.log('You need to manually create it in Supabase Dashboard SQL Editor.');
        console.log('Then run this script again.');
        return;
    }

    // Insert students
    console.log('📝 Inserting students...');
    const { data, error } = await supabase
        .from('students')
        .insert(students)
        .select();

    if (error) {
        console.error('❌ Error inserting students:', error.message);
        console.log('Details:', error);
        return;
    }

    console.log(`✅ Successfully inserted ${data.length} students!\n`);
    
    // Display students
    console.log('📋 Students in database:');
    console.log('─'.repeat(80));
    console.log('Name'.padEnd(20) + 'Roll Number'.padEnd(15) + 'TOTP Secret'.padEnd(20) + 'Dept'.padEnd(15));
    console.log('─'.repeat(80));
    data.forEach((s) => {
        console.log(
            s.name.padEnd(20) + 
            s.roll_number.padEnd(15) + 
            s.totp_secret.padEnd(20) +
            s.department.padEnd(15)
        );
    });
    console.log('─'.repeat(80));
    console.log('\n✅ Setup complete! Your database is ready to use.');
}

setup();
