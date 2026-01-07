"use server";

import { supabase } from "@/lib/supabase";

export async function getStudentSecret(rollNumber: string) {
    try {
        const { data, error } = await supabase
            .from('students')
            .select('secret_key, name')
            .eq('id', rollNumber.trim().toUpperCase())
            .single();

        if (error || !data) {
            return { error: "Student not found" };
        }

        return { secret: data.secret_key, name: data.name };
    } catch (err) {
        console.error("Error fetching student secret:", err);
        return { error: "Internal Server Error" };
    }
}
