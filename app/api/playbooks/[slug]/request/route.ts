import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { adminEmail, sendEmail } from '@/lib/email';

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const notes = typeof body?.notes === 'string' ? body.notes.trim() : '';

  if (!notes) {
    return NextResponse.json({ error: 'notes required' }, { status: 400 });
  }
  if (notes.length > 4000) {
    return NextResponse.json({ error: 'notes too long (max 4000 chars)' }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('org_id, full_name, company, organizations:org_id (name)')
    .eq('id', user.id)
    .maybeSingle();

  if (!profile?.org_id) {
    return NextResponse.json({ error: 'organization not found' }, { status: 400 });
  }

  const { data: playbook } = await supabase
    .from('resources')
    .select('title')
    .eq('type', 'playbook')
    .eq('slug', params.slug)
    .maybeSingle();

  if (!playbook) {
    return NextResponse.json({ error: 'playbook not found' }, { status: 404 });
  }

  const { data: inserted, error } = await supabase
    .from('playbook_requests')
    .insert({
      org_id: profile.org_id,
      user_id: user.id,
      playbook_slug: params.slug,
      status: 'requested',
      notes,
    })
    .select('id')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const admin = adminEmail();
  if (admin) {
    const fullName = (profile.full_name as string | undefined) || user.email || 'Unknown user';
    const org = profile.organizations as { name?: string } | null | undefined;
    const orgName = (org?.name as string | undefined) || (profile.company as string | undefined) || '—';
    sendEmail({
      to: admin,
      subject: `[Playbook request] ${playbook.title} — ${orgName}`,
      replyTo: user.email ?? undefined,
      html: `
        <p><strong>${escapeHtml(fullName)}</strong> (${escapeHtml(user.email ?? '—')}) from <strong>${escapeHtml(orgName)}</strong> requested the <em>${escapeHtml(playbook.title as string)}</em> playbook.</p>
        <p><strong>Notes:</strong></p>
        <blockquote style="border-left: 3px solid #0D2B6B; padding-left: 12px; color: #333;">${escapeHtml(notes).replace(/\n/g, '<br/>')}</blockquote>
        <p>Request ID: <code>${inserted.id}</code></p>
      `,
    }).catch((err) => console.error('[playbooks] admin notify failed', err));
  }

  return NextResponse.json({ ok: true, id: inserted.id });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
