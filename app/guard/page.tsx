"use client";

import { useState } from "react";
import QRScanner from "@/app/components/qr-scanner";
import { verifyToken } from "./actions";

type ScanStatus = "IDLE" | "VERIFYING" | "GRANTED" | "DENIED";

export default function GuardPage() {
    const [status, setStatus] = useState<ScanStatus>("IDLE");
    const [lastScanned, setLastScanned] = useState<string>("");

    const handleScan = async (data: string | null) => {
        if (!data || status !== "IDLE") return;

        // Simple debounce to prevent duplicate processing of the same code instantly
        // In a real app we'd track IDs
        // if (data === lastScanned && status === 'IDLE') return;

        setStatus("VERIFYING");
        setLastScanned(data);

        try {
            const isValid = await verifyToken(data);
            if (isValid) {
                setStatus("GRANTED");
                // Auto-reset after 2 seconds
                setTimeout(() => setStatus("IDLE"), 2000);
            } else {
                setStatus("DENIED");
                setTimeout(() => setStatus("IDLE"), 2000);
            }
        } catch (e) {
            console.error(e);
            setStatus("DENIED");
            setTimeout(() => setStatus("IDLE"), 2000);
        }
    };

    // DEBUGGING: Manual entry if camera fails or for testing
    const [manualCode, setManualCode] = useState("");
    const handleManualVerify = () => handleScan(manualCode);

    return (
        <main className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center p-4">

            {/* SUCCESS STATE */}
            {status === "GRANTED" && (
                <div className="fixed inset-0 z-50 bg-neon-green flex items-center justify-center animate-pulse">
                    <div className="text-black text-center space-y-4">
                        <h1 className="text-8xl font-black tracking-tighter uppercase">ACCESS<br />GRANTED</h1>
                        <p className="text-2xl font-mono tracking-[0.5em] font-bold">IDENTITY VERIFIED</p>
                    </div>
                </div>
            )}

            {/* ERROR STATE */}
            {status === "DENIED" && (
                <div className="fixed inset-0 z-50 bg-neon-red flex items-center justify-center animate-pulse">
                    <div className="text-black text-center space-y-4">
                        <h1 className="text-8xl font-black tracking-tighter uppercase">ACCESS<br />DENIED</h1>
                        <p className="text-2xl font-mono tracking-[0.5em] font-bold">INVALID TOKEN</p>
                    </div>
                </div>
            )}

            {/* IDLE / SCANNING STATE */}
            <div className="z-10 w-full max-w-md flex flex-col items-center gap-8">
                <div className="text-center space-y-2">
                    <h1 className="text-neon-red text-4xl font-black tracking-wider drop-shadow-lg">GUARD POST</h1>
                    <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">
                        System Status: {status === 'VERIFYING' ? 'PROCESSING...' : 'READY'}
                    </p>
                </div>

                <div className="relative w-full flex justify-center">
                    {status === "VERIFYING" && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/80 backdrop-blur-sm rounded-xl">
                            <div className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                    <QRScanner onScan={handleScan} />
                </div>

                {/* Debug / Manual Input */}
                <details className="w-full">
                    <summary className="text-gray-700 text-xs cursor-pointer hover:text-gray-500 text-center font-mono">
                        [MANUAL OVERRIDE]
                    </summary>
                    <div className="flex gap-2 mt-4">
                        <input
                            type="text"
                            value={manualCode}
                            onChange={(e) => setManualCode(e.target.value)}
                            placeholder="Enter TOTP Token"
                            className="flex-1 bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-lg font-mono focus:border-neon-blue outline-none"
                            maxLength={6}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                handleScan(manualCode);
                            }}
                            className="bg-gray-800 hover:bg-neon-blue hover:text-black text-white px-6 py-3 rounded-lg font-bold transition-colors"
                        >
                            CHECK
                        </button>
                    </div>
                </details>
            </div>

            <div className="scanline" />
        </main>
    );
}
