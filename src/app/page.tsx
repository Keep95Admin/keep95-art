// src/app/page.tsx — MISSION STATEMENT ADDED
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import ScannerLine from '@/components/ScannerLine';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-black">
      <header className="relative">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <Link href="/" className="text-white font-black text-4xl tracking-tighter">
            Keep95.art
          </Link>

          {user ? (
            <div className="flex items-center gap-6">
              <Link
                href="/admin/drops/new"
                className="bg-white text-black px-10 py-4 rounded-full text-xl font-black hover:scale-105 transition"
              >
                + Create Drop
              </Link>
              <form action="/auth/signout" method="post">
                <button className="bg-red-600 text-white px-10 py-4 rounded-full text-xl font-black hover:bg-red-700 transition">
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link
                href="/login"
                className="bg-white text-black px-10 py-4 rounded-full text-xl font-black hover:scale-105 transition shadow-xl"
              >
                Artist Login / Sign Up
              </Link>

              <Link
                href="/customer-login"
                className="bg-gray-800 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-700 hover:scale-105 transition shadow-xl"
              >
                Customer Login / Sign Up
              </Link>

              <Link
                href="/drops?guest=true"
                className="text-white/70 underline underline-offset-4 hover:text-white transition text-sm"
              >
                Continue as Guest
              </Link>
            </div>
          )}
        </div>

        <ScannerLine />
      </header>

      <section className="flex-1 flex items-center justify-center px-6">
        <div className="text-center space-y-12 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight">
            Keep95.art
          </h1>

          <p className="text-2xl md:text-4xl text-white/90 font-bold tracking-tight">
            Built to connect artists and collectors<br className="hidden md:block" />
            without the middlemen.
          </p>

          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Artists keep 95% forever. Collectors own real digital art. No greedy platforms. No hidden fees. Just art and trust.
          </p>
        </div>
      </section>
    </main>
  );
}