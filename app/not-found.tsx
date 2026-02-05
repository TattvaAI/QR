import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-8">
      <div className="z-10 flex flex-col items-center gap-6 text-center max-w-md">
        <h1 className="text-9xl font-black tracking-tighter text-neon-blue/30">
          404
        </h1>
        <h2 className="text-3xl font-black tracking-tighter text-neon-blue drop-shadow-[0_0_10px_rgba(15,240,252,0.5)]">
          LOCATION NOT FOUND
        </h2>
        <p className="text-gray-400 tracking-wider">
          The requested resource does not exist in the system
        </p>
        <Link
          href="/"
          className="mt-4 bg-gray-900 border border-neon-blue/30 hover:border-neon-blue hover:bg-neon-blue/10 text-neon-blue px-8 py-3 rounded-xl transition-all duration-300 font-bold tracking-widest"
        >
          RETURN HOME
        </Link>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black -z-10" />
      <div className="scanline" />
    </main>
  );
}
