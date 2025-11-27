import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function SingleDropPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // Await to resolve Promise
  const { id } = resolvedParams;

  const supabase = await createClient();
  const { data: drop, error } = await supabase
    .from('drops')
    .select('id, title, price, image_url, return_policy, description, artist:artists (id, name)')
    .eq('id', id)
    .single();

  if (error || !drop) {
    return <div className="text-center py-32 text-red-500">Drop not found or error: {error?.message}</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/drops" className="text-cyan-400 hover:underline mb-8 block">&larr; Back to Drops</Link>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-950 rounded-2xl overflow-hidden">
            {drop.image_url ? (
              <Image 
                src={drop.image_url} 
                alt={drop.title} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-700 text-6xl font-bold">ART</div>
            )}
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-black">{drop.title}</h1>
            <p className="text-3xl font-bold text-cyan-400">${drop.price}</p>
            {drop.artist?.[0]?.name && (
              <p className="text-lg text-gray-400">By {drop.artist[0].name}</p>
            )}
            <div className="prose prose-invert">
              <p>{drop.description || 'No description available.'}</p>
            </div>
            <div className="mt-8">
              <button className="bg-cyan-500 text-black px-8 py-3 rounded-full font-bold hover:bg-cyan-400">
                Purchase
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">Return Policy: {drop.return_policy}</p>
          </div>
        </div>
      </div>
    </main>
  );
}