"use server";

import { authenticator } from "otplib";
import { supabase, logAccess } from "@/lib/supabase";

export type VerificationResult = {
    success: boolean;
    studentName?: string;
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
            .select('id, name, secret_key')
            .eq('id', roll)
            .single();

        if (studentError || !student) {
            return { success: false, error: "Student not found" };
        }

        // 3. Verify TOTP
        authenticator.options = { window: 1, step: 30 };
        const isValid = authenticator.check(token, student.secret_key);

        if (isValid) {
            // 4. Log Access
            await logAccess(student.id, 'GRANTED');
            return {
                success: true,
                studentName: student.name
            };
        } else {
            await logAccess(student.id, 'DENIED');
            return { success: false, error: "Invalid Token" };
        }
    } catch (error) {
        console.error("Verification Error:", error);
        return { success: false, error: "Server Error" };
    }
}
