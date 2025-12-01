'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ComingSoon() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'SummitSucks') {
      document.cookie = 'passcode=SummitSucks; path=/; max-age=86400'; // 24 hours
      router.push('/');
    } else {
      setError('Wrong passcode');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-6xl font-black">Coming Soon</h1>
        <p className="text-xl">Keep95.art is under construction. Enter passcode to access dev site.</p>
        <input
          type="password"
          placeholder="Passcode"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          required
          className="w-full p-4 bg-gray-900 border border-gray-700 rounded-full text-white"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-cyan-500 text-black p-4 rounded-full font-bold hover:bg-cyan-400">
          Enter
        </button>
      </form>
    </main>
  );
}