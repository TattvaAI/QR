"use server";

import { authenticator } from "otplib";

const SECRET = "JBSWY3DPEHPK3PXP";

export async function verifyToken(token: string): Promise<boolean> {
    // Allow for 1 step (30s) drift in either direction (past/future)
    // This helps with network latency or slight clock desync
    authenticator.options = { window: 1, step: 30 };

    try {
        const isValid = authenticator.check(token, SECRET);
        console.log(`[VERIFY] Token: ${token} | Valid: ${isValid}`);
        return isValid;
    } catch (error) {
        console.error("Verification Error:", error);
        return false;
    }
}
