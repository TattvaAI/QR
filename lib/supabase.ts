import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for your database tables
export type Student = {
    id: string;
    name: string;
    email: string;
    roll_number: string;
    department: string;
    year: number;
    totp_secret: string;
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

export async function logAccess(studentId: string, status: 'GRANTED' | 'DENIED'): Promise<void> {
    await supabase
        .from('access_logs')
        .insert({ student_id: studentId, status });
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
