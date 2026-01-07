const { Client } = require('pg');

const connectionString = 'postgresql://postgres:DeiX98ImpRfkP1Jo@db.hscawdrcrpknowijwvsu.supabase.co:5432/postgres';

async function fixIndex() {
    const client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();
        console.log('🚀 Connected to database');

        const sql = `
            ALTER TABLE access_logs ADD COLUMN IF NOT EXISTS guard_note TEXT;
            DROP INDEX IF EXISTS idx_access_logs_replay_protection;
            CREATE INDEX idx_access_logs_replay_protection ON access_logs(student_id, guard_note);
        `;

        await client.query(sql);
        console.log('✅ Index fixed successfully!');
    } catch (err) {
        console.error('❌ Error fixing index:', err.message);
    } finally {
        await client.end();
    }
}

fixIndex();
