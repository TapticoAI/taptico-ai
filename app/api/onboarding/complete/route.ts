import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { adminEmail, sendEmail } from '@/lib/email';

export async function POST(_request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const nowIso = new Date().toISOString();

  const { data: profile, error } = await supabase
    .from('profiles')
    .update({ onboarded_at: nowIso })
    .eq('id', user.id)
    .select('full_name, company, role')
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Best-effort notifications — never block onboarding on email failure.
  const fullName = (profile?.full_name as string | undefined) || user.email || 'there';
  const company = (profile?.company as string | undefined) || '—';
  const role = (profile?.role as string | undefined) || '—';

  if (user.email) {
    sendEmail({
      to: user.email,
      subject: 'Welcome to TapticoAI',
      html: `
        <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; color: #0A0A0A;">
          <h1 style="color: #0D2B6B;">Welcome, ${escapeHtml(fullName)}.</h1>
          <p>Your TapticoAI workspace is live. A few things to try first:</p>
          <ul>
            <li>Browse your <a href="https://app.taptico.ai/playbooks">playbooks</a>.</li>
            <li>Request your first run — fulfillment is white-glove while we dial in automation.</li>
            <li>Jump into Discord and tell us what's on your plate.</li>
          </ul>
          <p>— The Taptico team</p>
        </div>
      `,
    }).catch((err) => console.error('[onboarding] welcome email failed', err));
  }

  const admin = adminEmail();
  if (admin) {
    sendEmail({
      to: admin,
      subject: `New TapticoAI signup: ${fullName} (${company})`,
      html: `
        <p><strong>${escapeHtml(fullName)}</strong> just finished onboarding.</p>
        <ul>
          <li>Email: ${escapeHtml(user.email ?? '—')}</li>
          <li>Company: ${escapeHtml(company)}</li>
          <li>Role: ${escapeHtml(role)}</li>
        </ul>
      `,
    }).catch((err) => console.error('[onboarding] admin notify failed', err));
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
