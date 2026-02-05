"use client";

import { useState } from "react";
import QRScanner from "@/app/components/qr-scanner";
import { verifyToken } from "./actions";

type ScanStatus = "IDLE" | "VERIFYING" | "GRANTED" | "DENIED" | "REPLAYED";

export default function GuardPage() {
    const [status, setStatus] = useState<ScanStatus>("IDLE");
    const [result, setResult] = useState<{ name?: string; photoUrl?: string | null; error?: string }>({});

    const handleScan = async (data: string | null) => {
        if (!data || status !== "IDLE") return;

        setStatus("VERIFYING");

        try {
            const res = await verifyToken(data);
            setResult({ name: res.studentName, photoUrl: res.photoUrl, error: res.error });

            if (res.success) {
                setStatus("GRANTED");
                // Auto-reset after 3 seconds to see the name longer
                setTimeout(() => setStatus("IDLE"), 3000);
            } else if (res.error === "DUPLICATE ENTRY") {
                setStatus("REPLAYED");
                setTimeout(() => setStatus("IDLE"), 4000);
            } else {
                setStatus("DENIED");
                setTimeout(() => setStatus("IDLE"), 2000);
            }
        } catch (e) {
            console.error(e);
            setResult({ error: "System Error" });
            setStatus("DENIED");
            setTimeout(() => setStatus("IDLE"), 2000);
        }
    };

    // Manual entry state
    const [manualRoll, setManualRoll] = useState("");
    const [manualToken, setManualToken] = useState("");

    const handleManualVerify = () => {
        const qrString = JSON.stringify({ roll: manualRoll, token: manualToken });
        handleScan(qrString);
    };

    return (
        <main className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center p-4">

            {/* SUCCESS STATE */}
            {status === "GRANTED" && (
                <div className="fixed inset-0 z-50 bg-neon-green flex items-center justify-center animate-pulse">
                    <div className="text-black text-center space-y-6">
                        {/* Student Photo */}
                        {result.photoUrl && (
                            <div className="flex justify-center mb-4">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-8 border-black shadow-2xl">
                                    <img
                                        src={result.photoUrl}
                                        alt={result.name || "Student"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        <h1 className="text-8xl font-black tracking-tighter uppercase">ACCESS<br />GRANTED</h1>
                        <p className="text-3xl font-mono tracking-widest font-black border-y-2 border-black py-2">
                            {result.name?.toUpperCase()}
                        </p>
                        <p className="text-xl font-mono tracking-[0.5em] font-bold">IDENTITY VERIFIED</p>
                    </div>
                </div>
            )}

            {/* ERROR STATE */}
            {status === "DENIED" && (
                <div className="fixed inset-0 z-50 bg-neon-red flex items-center justify-center animate-pulse">
                    <div className="text-black text-center space-y-4">
                        <h1 className="text-8xl font-black tracking-tighter uppercase">ACCESS<br />DENIED</h1>
                        <p className="text-2xl font-mono tracking-[0.5em] font-bold">{result.error || "INVALID TOKEN"}</p>
                    </div>
                </div>
            )}

            {/* REPLAY WARNING */}
            {status === "REPLAYED" && (
                <div className="fixed inset-0 z-50 bg-orange-500 flex items-center justify-center border-[20px] border-black">
                    <div className="text-black text-center space-y-4">
                        <div className="text-9xl font-black">⚠️</div>
                        <h1 className="text-7xl font-black tracking-tighter uppercase leading-none">ALREADY<br />SCANNED</h1>
                        <div className="bg-black text-orange-500 px-6 py-2 inline-block font-mono text-xl font-bold rounded">
                            REPLAY ATTACK DETECTED
                        </div>
                        <p className="text-xl font-mono font-bold uppercase pt-4">Token Voided</p>
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
                    <div className="flex flex-col gap-2 mt-4">
                        <input
                            type="text"
                            value={manualRoll}
                            onChange={(e) => setManualRoll(e.target.value)}
                            placeholder="Roll Number"
                            className="bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-lg font-mono focus:border-neon-blue outline-none uppercase"
                        />
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={manualToken}
                                onChange={(e) => setManualToken(e.target.value)}
                                placeholder="Token"
                                className="flex-1 bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-lg font-mono focus:border-neon-blue outline-none"
                                maxLength={6}
                            />
                            <button
                                type="button"
                                onClick={handleManualVerify}
                                className="bg-gray-800 hover:bg-neon-blue hover:text-black text-white px-6 py-3 rounded-lg font-bold transition-colors"
                            >
                                CHECK
                            </button>
                        </div>
                    </div>
                </details>
            </div>

            <div className="scanline" />
        </main>
    );
}
