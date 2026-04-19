import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const useTaptico = body?.useTapticoKey === true;
  const apiKey = typeof body?.apiKey === 'string' ? body.apiKey.trim() : '';

  const { data: profile } = await supabase
    .from('profiles')
    .select('org_id')
    .eq('id', user.id)
    .maybeSingle();
  if (!profile?.org_id) {
    return NextResponse.json({ error: 'organization not found' }, { status: 400 });
  }
  const orgId = profile.org_id as string;

  if (useTaptico) {
    const { error } = await supabase.rpc('clear_org_anthropic_secret', { p_org_id: orgId });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, usesTapticoKey: true });
  }

  if (!apiKey.startsWith('sk-ant-') || apiKey.length < 30) {
    return NextResponse.json({ error: 'That does not look like a valid Anthropic API key.' }, { status: 400 });
  }

  const last4 = apiKey.slice(-4);
  const { error } = await supabase.rpc('set_org_anthropic_secret', {
    p_org_id: orgId,
    p_secret: apiKey,
    p_last4: last4,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, usesTapticoKey: false, last4 });
}
