"use server";

import { supabase } from "@/lib/supabase";

export async function getStudentSecret(rollNumber: string) {
    try {
        console.log('[Student Action] Looking up roll number:', rollNumber.trim().toUpperCase());
        
        const { data, error } = await supabase
            .from('students')
            .select('secret_key, name, photo_url')
            .eq('id', rollNumber.trim().toUpperCase())
            .single();

        if (error) {
            console.error('[Student Action] Supabase error:', error);
            return { error: "Student not found" };
        }
        
        if (!data) {
            console.log('[Student Action] No data returned');
            return { error: "Student not found" };
        }

        console.log('[Student Action] Found student:', data.name);
        return { secret: data.secret_key, name: data.name, photoUrl: data.photo_url };
    } catch (err) {
        console.error("[Student Action] Exception:", err);
        return { error: "Internal Server Error" };
    }
}
