// src/app/drops/page.tsx — FINAL: NO MORE ARTIST NAME ERROR
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { trackDropView } from '@/lib/trackView';

export const revalidate = 60;

export default async function DropsGallery() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: drops } = await supabase
    .from('drops')
    .select(`
      id,
      title,
      price,
      image_url,
      return_policy,
      artist:artists (id, name)
    `)
    .order('created_at', { ascending: false });

  if (drops) {
    for (const drop of drops) {
      await trackDropView(drop.id);
    }
  }

  const getPolicyBadge = (policy: string) => {
    switch (policy) {
      case 'non_refundable':
        return <span className="bg-red-900/50 text-red-300 text-xs px-2 py-1 rounded">No Refunds</span>;
      case '7_day_preview':
        return <span className="bg-green-900/50 text-green-300 text-xs px-2 py-1 rounded">7-Day Preview</span>;
      case 'custom':
        return <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">Custom Policy</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-6">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-lg font-bold">
            ← Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Current Drops</h1>
          {user ? (
            <form action="/auth/signout" method="post">
              <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-bold transition">
                Logout
              </button>
            </form>
          ) : (
            <div className="w-32" />
          )}
        </div>

        {drops && drops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {drops.map((drop) => (
              <Link key={drop.id} href={`/drops/${drop.id}`} className="group block">
                <div className="aspect-square bg-gray-950 rounded-2xl overflow-hidden border border-gray-800">
                  {drop.image_url ? (
                    <Image
                      src={drop.image_url}
                      alt={drop.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-700 text-6xl font-bold">
                      ART
                    </div>
                  )}
                </div>

                <div className="mt-5 space-y-2">
                  <h3 className="text-2xl font-bold group-hover:text-cyan-400 transition">
                    {drop.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-black text-cyan-400">${drop.price}</p>
                    {getPolicyBadge(drop.return_policy)}
                  </div>
                  {drop.artist?.[0]?.name && (
                    <p className="text-sm text-gray-500">by {drop.artist[0].name}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-4xl font-bold text-gray-600">
              No drops live yet — be the first.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}