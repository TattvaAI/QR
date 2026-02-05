'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-8">
      <div className="z-10 flex flex-col items-center gap-6 text-center max-w-md">
        <h1 className="text-6xl font-black tracking-tighter text-neon-red drop-shadow-[0_0_10px_rgba(255,7,58,0.5)]">
          ERROR
        </h1>
        <p className="text-xl text-gray-400 tracking-wider">
          SYSTEM MALFUNCTION DETECTED
        </p>
        <div className="bg-gray-900/80 border border-neon-red/30 p-6 rounded-xl">
          <p className="text-gray-500 font-mono text-sm">
            {error.message || 'An unexpected error occurred'}
          </p>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={reset}
            className="bg-gray-900 border border-neon-blue/30 hover:border-neon-blue hover:bg-neon-blue/10 text-neon-blue px-8 py-3 rounded-xl transition-all duration-300 font-bold tracking-widest"
          >
            RETRY
          </button>
          <Link
            href="/"
            className="bg-gray-900 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white px-8 py-3 rounded-xl transition-all duration-300 font-bold tracking-widest"
          >
            HOME
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black -z-10" />
    </main>
  );
}
