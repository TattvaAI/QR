const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hscawdrcrpknowijwvsu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzY2F3ZHJjcnBrbm93aWp3dnN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzYyNDk4OSwiZXhwIjoyMDgzMjAwOTg5fQ.Rj8fLy7yLlJD0Hi82Tm-xMC6cqoG8Tg7IXyrisd-lgY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
    // Try to get existing data
    const { data, error } = await supabase
        .from('students')
        .select('*')
        .limit(1);
    
    console.log('Existing data:', data);
    console.log('Error:', error);
}

check();
