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
  const company = typeof body?.company === 'string' ? body.company.trim() : '';
  const role = typeof body?.role === 'string' ? body.role.trim() : '';

  if (!company || !role) {
    return NextResponse.json({ error: 'company and role are required' }, { status: 400 });
  }

  const { data: profile, error: profileErr } = await supabase
    .from('profiles')
    .update({ company, role })
    .eq('id', user.id)
    .select('org_id')
    .maybeSingle();

  if (profileErr) {
    return NextResponse.json({ error: profileErr.message }, { status: 500 });
  }

  if (profile?.org_id) {
    const { error: orgErr } = await supabase
      .from('organizations')
      .update({ name: company })
      .eq('id', profile.org_id);
    if (orgErr) {
      return NextResponse.json({ error: orgErr.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
