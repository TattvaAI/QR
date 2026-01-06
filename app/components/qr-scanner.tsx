"use client";

import { useEffect, useState } from "react";
import { Scanner } from '@yudiel/react-qr-scanner';

interface QRScannerProps {
    onScan: (data: string | null) => void;
}

export default function QRScanner({ onScan }: QRScannerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="p-4 text-center">Initializing Camera...</div>;

    return (
        <div className="w-full max-w-sm h-[350px] overflow-hidden rounded-xl border-2 border-neon-blue/50 relative shadow-[0_0_20px_rgba(15,240,252,0.3)]">
            {/* HUD Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute top-4 left-4 w-16 h-1 bg-neon-blue/80" />
                <div className="absolute top-4 left-4 w-1 h-16 bg-neon-blue/80" />
                <div className="absolute top-4 right-4 w-16 h-1 bg-neon-blue/80" />
                <div className="absolute top-4 right-4 w-1 h-16 bg-neon-blue/80" />
                <div className="absolute bottom-4 left-4 w-16 h-1 bg-neon-blue/80" />
                <div className="absolute bottom-4 left-4 w-1 h-16 bg-neon-blue/80" />
                <div className="absolute bottom-4 right-4 w-16 h-1 bg-neon-blue/80" />
                <div className="absolute bottom-4 right-4 w-1 h-16 bg-neon-blue/80" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border border-white/20 rounded-lg animate-pulse" />
                </div>

                <div className="absolute bottom-6 left-0 right-0 text-center">
                    <span className="bg-black/80 text-neon-blue px-3 py-1 text-xs font-mono uppercase tracking-widest border border-neon-blue/30">
                        Scanning Target
                    </span>
                </div>
            </div>

            <div className="qr-scanner-container absolute inset-0 z-10">
                <Scanner
                    onScan={(result) => {
                        if (result && result.length > 0) {
                            onScan(result[0].rawValue);
                        }
                    }}
                    styles={{
                        container: { width: "100%", height: "100%", position: "absolute", inset: "0" },
                        video: { width: "100%", height: "100%", objectFit: "cover" }
                    }}
                    components={{
                        onOff: false,
                        torch: false,
                        zoom: false,
                        finder: false
                    }}
                    allowMultiple={true}
                    scanDelay={500}
                />
            </div>
        </div>
    );
}
