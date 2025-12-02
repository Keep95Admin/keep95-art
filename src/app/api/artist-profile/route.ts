import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const { user_id, email, username } = await request.json();
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from('profiles')  // Change to 'profiles' to match other code
    .insert([{ user_id, email, username, role: 'artist', wallet_address: '' }]); // Add role

  if (error) {
    console.error('Insert error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
