// src/components/NavBar.tsx
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import ScannerLine from './ScannerLine';

async function signOut() {
  'use server';
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}

export default async function NavBar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black">
      {/* Main header content */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-white font-black text-3xl tracking-tighter">
          Keep95.art
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <Link
              href="/admin/drops/new"
              className="bg-white text-black px-8 py-3 rounded-full text-lg font-bold hover:scale-105 transition"
            >
              + Create Drop
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-red-700 transition"
              >
                Logout
              </button>
            </form>
          </div>
        )}
      </div>

      {/* FINAL SCANNER — ONE SHOT, UNKILLABLE */}
      <ScannerLine />
    </nav>
  );
}