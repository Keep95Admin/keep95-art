import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';

export const revalidate = 60;

export default async function DropsGallery() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: drops } = await supabase.from('drops').select('id, title, price, image_url, return_policy, artist:artists(id, name)').order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-lg font-bold">← Home</Link>
          <h1 className="text-5xl font-black">Current Drops</h1>
          {user && (
            <form action="/auth/signout" method="post">
              <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-bold">Logout</button>
            </form>
          )}
        </div>

        {drops?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drops.map(drop => (
              <Link key={drop.id} href={`/drops/${drop.id}`} className="block group">
                <div className="aspect-square bg-gray-900 rounded-xl overflow-hidden">
                  {drop.image_url ? <Image src={drop.image_url} alt="" fill className="object-cover group-hover:scale-105 transition" /> : <div className="flex items-center justify-center h-full text-6xl text-gray-700">ART</div>}
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold group-hover:text-cyan-400">{drop.title}</h3>
                  <p className="text-3xl font-black text-cyan-400">${drop.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="text-4xl text-gray-500">No drops yet — be the first!</p>
          </div>
        )}
      </div>
    </div>
  );
}