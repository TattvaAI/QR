import { createClient } from '@supabase/supabase-js';

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Type definitions for your database tables
export type Student = {
    id: string;
    name: string;
    email: string;
    roll_number: string;
    department: string;
    year: number;
    totp_secret: string;
    photo_url?: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export type AccessLog = {
    id: string;
    student_id: string;
    status: 'GRANTED' | 'DENIED';
    guard_note: string | null;
    scanned_at: string;
};

// Database helpers
export async function getStudentBySecret(secret: string): Promise<Student | null> {
    const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('totp_secret', secret)
        .eq('is_active', true)
        .single();

    if (error) return null;
    return data;
}

export async function logAccess(studentId: string, status: 'GRANTED' | 'DENIED', tokenUsed?: string): Promise<void> {
    try {
        await supabase
            .from('access_logs')
            .insert({ 
                student_id: studentId, 
                status,
                guard_note: tokenUsed // Storing token in guard_note to avoid migration
            });
    } catch (e) {
        console.error("Logging failed:", e);
    }
}

export async function getAllStudents(): Promise<Student[]> {
    const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('is_active', true)
        .order('name');

    if (error) return [];
    return data || [];
}


export async function getStudentById(id: string): Promise<Student | null> {
    const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return null;
    return data;
}

export async function getStudentByRoll(rollNumber: string): Promise<Student | null> {
    const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('roll_number', rollNumber)
        .eq('is_active', true)
        .single();

    if (error) return null;
    return data;
}
