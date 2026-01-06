"use client";

import { useEffect, useState } from "react";
import { authenticator } from "otplib";
import { QRCodeSVG } from "qrcode.react";

// Hardcoded for MVP
const SECRET = "JBSWY3DPEHPK3PXP";

export default function StudentPage() {
    const [token, setToken] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState<number>(30);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Configure otplib for compatibility if needed, though defaults are usually fine
        authenticator.options = { step: 30, window: 1 };

        const update = () => {
            const epoch = Math.floor(Date.now() / 1000);
            const step = 30;
            const count = epoch % step;
            setTimeLeft(step - count);
            setToken(authenticator.generate(SECRET));
        };

        update(); // Initial call
        const interval = setInterval(update, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) return <div className="min-h-screen bg-black" />;

    const progressPercent = (timeLeft / 30) * 100;
    const isDanger = timeLeft <= 5;

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-black relative overflow-hidden">
            <div className="w-full max-w-md bg-gray-950/80 border border-neon-blue/30 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center gap-8 shadow-[0_0_50px_-10px_rgba(15,240,252,0.2)]">

                {/* Header */}
                <div className="text-center space-y-2 w-full border-b border-gray-800 pb-4">
                    <h2 className="text-neon-blue text-xs font-bold tracking-[0.3em] uppercase opacity-70">
                        Identity Authorization
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                        <span className="text-white font-mono text-sm tracking-wider">ACTIVE</span>
                    </div>
                </div>

                {/* QR Wrapper */}
                <div className="relative group">
                    {/* Corner accents */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-neon-blue" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-neon-blue" />
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-neon-blue" />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-neon-blue" />

                    <div className="p-4 bg-white rounded-lg">
                        {token && (
                            <QRCodeSVG
                                value={token}
                                size={220}
                                level={"M"}
                                includeMargin={false}
                            />
                        )}
                    </div>
                </div>

                {/* Token Display */}
                <div className="flex flex-col items-center gap-2">
                    <div className="font-mono text-4xl font-bold tracking-[0.5em] text-white tabular-nums drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                        {token.substring(0, 3)} {token.substring(3)}
                    </div>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">
                        Dynamic Auth Token
                    </span>
                </div>

                {/* Timer UI */}
                <div className="w-full space-y-2">
                    <div className="flex justify-between text-xs font-mono text-gray-400">
                        <span>EXPIRES IN</span>
                        <span className={isDanger ? "text-neon-red animate-pulse" : "text-neon-blue"}>
                            {timeLeft}s
                        </span>
                    </div>
                    <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                        <div
                            className={`h-full transition-all duration-1000 ease-linear ${isDanger ? 'bg-neon-red shadow-[0_0_10px_#ff0000]' : 'bg-neon-blue shadow-[0_0_10px_#0ff0fc]'}`}
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

            </div>

            <div className="scanline" />
        </main>
    );
}
