const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabaseUrl = 'https://hscawdrcrpknowijwvsu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzY2F3ZHJjcnBrbm93aWp3dnN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzYyNDk4OSwiZXhwIjoyMDgzMjAwOTg5fQ.Rj8fLy7yLlJD0Hi82Tm-xMC6cqoG8Tg7IXyrisd-lgY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Hash password with SHA256 (matching existing format)
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Students to insert (using your existing schema: id, name, password, secret_key)
const students = [
    { id: '2024CS002', name: 'Shivansh', password: hashPassword('shivansh123'), secret_key: 'JBSWY3DPEHPK3PXP' },
    { id: '2024CS003', name: 'Aryan', password: hashPassword('aryan123'), secret_key: 'GEZDGNBVGY3TQOJQ' },
    { id: '2024CS004', name: 'Nisha', password: hashPassword('nisha123'), secret_key: 'MFRGGZDFMY4TQNBZ' },
    { id: '2024CS005', name: 'Bhawana', password: hashPassword('bhawana123'), secret_key: 'NBSWY3DPEHPK3PXQ' },
    { id: '2024CS006', name: 'Khushi Dhiman', password: hashPassword('khushi123'), secret_key: 'OBQXG43XN5ZGI5DZ' },
    { id: '2024CS007', name: 'Aarzoo', password: hashPassword('aarzoo123'), secret_key: 'KRSXG5CTMVRXEZLU' },
    { id: '2024CS008', name: 'Priya Singh', password: hashPassword('priya123'), secret_key: 'JZSXE5LZNFWWK3TB' },
    { id: '2024CS009', name: 'Amit Kumar', password: hashPassword('amit123'), secret_key: 'KNQW24DPNVYCEIDP' },
    { id: '2024CS010', name: 'Sneha Patel', password: hashPassword('sneha123'), secret_key: 'LFVWY3DPOVWXI2LB' },
    { id: '2024CS011', name: 'Vikram Verma', password: hashPassword('vikram123'), secret_key: 'MNBVC43XOQZGI4DM' },
    { id: '2024CS012', name: 'Anjali Gupta', password: hashPassword('anjali123'), secret_key: 'PFQWG43CPRZGK3DS' },
    { id: '2024CS013', name: 'Rohit Mehta', password: hashPassword('rohit123'), secret_key: 'QRSTU2DPEHPK5PXR' },
    { id: '2024CS014', name: 'Kavya Joshi', password: hashPassword('kavya123'), secret_key: 'RSTXG5BONVRHE3LF' },
    { id: '2024CS015', name: 'Deepak Yadav', password: hashPassword('deepak123'), secret_key: 'STUVW3DPMNPK4PYS' },
];

async function setup() {
    console.log('🚀 Setting up database...\n');

    // Insert students
    console.log('📝 Inserting students...');
    const { data, error } = await supabase
        .from('students')
        .upsert(students, { onConflict: 'id' })
        .select();

    if (error) {
        console.error('❌ Error inserting students:', error.message);
        console.log('Details:', error);
        return;
    }

    console.log(`✅ Successfully inserted/updated ${data.length} students!\n`);
    
    // Fetch all students
    const { data: allStudents } = await supabase
        .from('students')
        .select('*')
        .order('id');
    
    console.log('📋 All students in database:');
    console.log('─'.repeat(80));
    console.log('ID'.padEnd(15) + 'Name'.padEnd(20) + 'Secret Key'.padEnd(20));
    console.log('─'.repeat(80));
    allStudents.forEach((s) => {
        console.log(
            s.id.padEnd(15) + 
            s.name.padEnd(20) + 
            s.secret_key.padEnd(20)
        );
    });
    console.log('─'.repeat(80));
    console.log(`\n✅ Total: ${allStudents.length} students in database`);
}

setup();
