const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hscawdrcrpknowijwvsu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzY2F3ZHJjcnBrbm93aWp3dnN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzYyNDk4OSwiZXhwIjoyMDgzMjAwOTg5fQ.Rj8fLy7yLlJD0Hi82Tm-xMC6cqoG8Tg7IXyrisd-lgY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
    console.log('🔄 Running migration to add photo_url column...\n');

    // Add photo_url column
    const { data, error } = await supabase.rpc('exec_sql', {
        sql: 'ALTER TABLE students ADD COLUMN IF NOT EXISTS photo_url TEXT;'
    });

    if (error) {
        console.error('❌ Error running migration:', error.message);
        console.log('Details:', error);
        console.log('\n⚠️  Please run this SQL manually in Supabase SQL Editor:');
        console.log('ALTER TABLE students ADD COLUMN IF NOT EXISTS photo_url TEXT;');
        return false;
    }

    console.log('✅ Migration completed successfully!\n');
    return true;
}

async function updatePhoto() {
    console.log('🔄 Updating photo for student 2024CS002...\n');

    const { data, error } = await supabase
        .from('students')
        .update({ photo_url: '/student-photos/2024CS002.jpg' })
        .eq('roll_number', 'CS2024002')
        .select();

    if (error) {
        console.error('❌ Error updating photo:', error.message);
        console.log('Details:', error);
        return;
    }

    if (data && data.length > 0) {
        console.log('✅ Successfully updated photo for student 2024CS002!');
        console.log('Student:', data[0].name);
        console.log('Photo URL:', data[0].photo_url);
    } else {
        console.log('⚠️  No student found with roll number CS2024002');
    }
}

async function main() {
    const migrated = await runMigration();
    if (migrated !== false) {
        await updatePhoto();
    }
}

main();
