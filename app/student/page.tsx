"use client";

import { useEffect, useState } from "react";
import { authenticator } from "otplib";
import { QRCodeSVG } from "qrcode.react";
import { getStudentSecret } from "./actions";

export default function StudentPage() {
    const [rollNumber, setRollNumber] = useState<string>("");
    const [secret, setSecret] = useState<string | null>(null);
    const [studentName, setStudentName] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState<number>(30);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        // Load from localStorage
        const savedRoll = localStorage.getItem("gatepass_roll");
        const savedSecret = localStorage.getItem("gatepass_secret");
        const savedName = localStorage.getItem("gatepass_name");

        if (savedRoll && savedSecret) {
            setRollNumber(savedRoll);
            setSecret(savedSecret);
            setStudentName(savedName || "");
        }

        authenticator.options = { step: 30, window: 1 };
    }, []);

    useEffect(() => {
        if (!secret) return;

        const update = () => {
            const epoch = Math.floor(Date.now() / 1000);
            const step = 30;
            const count = epoch % step;
            setTimeLeft(step - count);
            setToken(authenticator.generate(secret));
        };

        update();
        const interval = setInterval(update, 1000);

        return () => clearInterval(interval);
    }, [secret]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const res = await getStudentSecret(rollNumber);
        if (res.error) {
            setError(res.error);
        } else if (res.secret) {
            setSecret(res.secret);
            setStudentName(res.name || "");
            localStorage.setItem("gatepass_roll", rollNumber.trim().toUpperCase());
            localStorage.setItem("gatepass_secret", res.secret);
            if (res.name) localStorage.setItem("gatepass_name", res.name);
        }
        setIsLoading(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("gatepass_roll");
        localStorage.removeItem("gatepass_secret");
        localStorage.removeItem("gatepass_name");
        setSecret(null);
        setRollNumber("");
        setStudentName("");
    };

    if (!mounted) return <div className="min-h-screen bg-black" />;

    // LOGIN VIEW
    if (!secret) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-black relative overflow-hidden">
                <div className="w-full max-w-md bg-gray-950/80 border border-neon-blue/30 backdrop-blur-md rounded-2xl p-8 flex flex-col gap-6 shadow-[0_0_50px_-10px_rgba(15,240,252,0.2)]">
                    <div className="text-center space-y-2">
                        <h2 className="text-neon-blue text-xs font-bold tracking-[0.3em] uppercase opacity-70">
                            Student Login
                        </h2>
                        <h1 className="text-3xl font-black text-white tracking-widest">GATEPASS</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 font-mono">ENTER ROLL NUMBER</label>
                            <input
                                type="text"
                                value={rollNumber}
                                onChange={(e) => setRollNumber(e.target.value)}
                                placeholder="e.g. 2024CS01"
                                className="w-full bg-black border border-gray-800 text-neon-blue p-4 rounded-xl font-mono focus:border-neon-blue outline-none transition-all uppercase"
                                required
                            />
                        </div>
                        {error && <p className="text-neon-red text-xs font-mono">{error}</p>}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-neon-blue text-black font-black py-4 rounded-xl hover:bg-white transition-all tracking-widest disabled:opacity-50"
                        >
                            {isLoading ? "VERIFYING..." : "INITIALIZE"}
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    const progressPercent = (timeLeft / 30) * 100;
    const isDanger = timeLeft <= 5;
    const qrData = JSON.stringify({ roll: rollNumber, token });

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-black relative overflow-hidden">
            <div className="w-full max-w-md bg-gray-950/80 border border-neon-blue/30 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center gap-8 shadow-[0_0_50px_-10px_rgba(15,240,252,0.2)]">

                {/* Header */}
                <div className="text-center space-y-2 w-full border-b border-gray-800 pb-4">
                    <h2 className="text-neon-blue text-xs font-bold tracking-[0.3em] uppercase opacity-70">
                        {studentName || "Identity Authorization"}
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                        <span className="text-white font-mono text-sm tracking-wider">{rollNumber}</span>
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
                                value={qrData}
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

                <button
                    onClick={handleLogout}
                    className="text-gray-600 text-[10px] font-mono hover:text-neon-red transition-colors uppercase tracking-[0.2em]"
                >
                    [ DISCONNECT IDENTITY ]
                </button>

            </div>

            <div className="scanline" />
        </main>
    );
}
