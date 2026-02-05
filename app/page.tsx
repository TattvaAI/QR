import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-8 relative overflow-hidden">
      <div className="z-10 flex flex-col items-center gap-4 text-center">
        <h1 className="text-6xl font-black tracking-tighter text-neon-blue drop-shadow-[0_0_10px_rgba(15,240,252,0.5)]">
          GATEPASS
        </h1>
        <p className="text-xl text-gray-400 max-w-md tracking-wider">
          SECURE DYNAMIC ACCESS CONTROL
        </p>

        <div className="flex gap-6 mt-12 w-full max-w-md">
          <Link
            href="/student"
            className="flex-1 bg-gray-900 border border-neon-blue/30 hover:border-neon-blue hover:bg-neon-blue/10 text-neon-blue py-6 rounded-xl transition-all duration-300 flex items-center justify-center font-bold text-lg tracking-widest group"
          >
            <span className="group-hover:translate-x-1 transition-transform">PROVER &rarr;</span>
          </Link>

          <Link
            href="/guard"
            className="flex-1 bg-gray-900 border border-neon-red/30 hover:border-neon-red hover:bg-neon-red/10 text-neon-red py-6 rounded-xl transition-all duration-300 flex items-center justify-center font-bold text-lg tracking-widest group"
          >
            <span className="group-hover:translate-x-1 transition-transform">VERIFIER &rarr;</span>
          </Link>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black -z-10" />
      <div className="scanline" />
    </main>
  );
}
