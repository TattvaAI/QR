"use server";

import { authenticator } from "otplib";
import { supabase, logAccess } from "@/lib/supabase";

export type VerificationResult = {
    success: boolean;
    studentName?: string;
    photoUrl?: string | null;
    error?: string;
};

export async function verifyToken(qrString: string): Promise<VerificationResult> {
    // 1. Parse JSON
    let roll: string;
    let token: string;

    try {
        const data = JSON.parse(qrString);
        roll = data.roll;
        token = data.token;

        if (!roll || !token) {
            return { success: false, error: "Invalid QR format" };
        }
    } catch (e) {
        // If it's not JSON, it might be an old/manual token (for backward compatibility or manual entry)
        // But the requirement says expect { roll, token }
        return { success: false, error: "Invalid QR Code" };
    }

    // 2. Lookup student
    try {
        const { data: student, error: studentError } = await supabase
            .from('students')
            .select('id, name, totp_secret, photo_url')
            .eq('roll_number', roll)
            .single();

        if (studentError || !student) {
            return { success: false, error: "Student not found" };
        }

        // 3. Verify TOTP
        authenticator.options = { window: 1, step: 30 };
        const isValid = authenticator.check(token, student.totp_secret);

        if (!isValid) {
            await logAccess(student.id, 'DENIED', token);
            return { success: false, error: "Invalid Token" };
        }

        // 4. SECURITY CHECK: Replay Protection
        const { count, error: countError } = await supabase
            .from('access_logs')
            .select('*', { count: 'exact', head: true })
            .eq('student_id', student.id)
            .eq('guard_note', token)
            .eq('status', 'GRANTED');

        if (countError) {
            console.error("Replay check error:", countError);
        } else if (count && count > 0) {
            return { success: false, error: "DUPLICATE ENTRY" };
        }

        // 5. Log Access & Grant
        await logAccess(student.id, 'GRANTED', token);
        return {
            success: true,
            studentName: student.name,
            photoUrl: student.photo_url
        };
    } catch (error) {
        console.error("Verification Error:", error);
        return { success: false, error: "Server Error" };
    }
}
