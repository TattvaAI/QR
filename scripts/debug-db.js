const { Client } = require('pg');

const connectionString = 'postgresql://postgres:DeiX98ImpRfkP1Jo@db.hscawdrcrpknowijwvsu.supabase.co:5432/postgres';

async function checkTables() {
    const client = new Client({ connectionString });
    try {
        await client.connect();
        const res = await client.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'access_logs';
        `);
        console.log('Columns in access_logs:', res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

checkTables();
