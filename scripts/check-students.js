const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read .env.local file
const envFile = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkStudents() {
  console.log('Checking students in Supabase...\n');
  
  // First, try to get all columns
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .limit(20);
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  if (!data || data.length === 0) {
    console.log('❌ No students found in database!');
    return;
  }
  
  console.log(`✅ Found ${data.length} students:\n`);
  console.log('First student structure:', JSON.stringify(data[0], null, 2));
  console.log('\n\nAll students:');
  data.forEach(s => {
    console.log(`\n- ID: ${s.id}`);
    console.log(`  Name: ${s.name}`);
    console.log(`  Email: ${s.email}`);
    if (s.roll_number) console.log(`  Roll: ${s.roll_number}`);
    if (s.totp_secret) console.log(`  Secret: ${s.totp_secret}`);
    if (s.secret_key) console.log(`  Secret Key: ${s.secret_key}`);
  });
}

checkStudents();
