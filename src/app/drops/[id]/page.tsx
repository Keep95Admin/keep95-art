import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

export default async function DropPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: drop } = await supabase.from('drops').select('*').eq('id', params.id).single();

  if (!drop) notFound();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-8">{drop.title}</h1>
        <p className="text-6xl text-cyan-400">${drop.price}</p>
      </div>
    </div>
  );
}