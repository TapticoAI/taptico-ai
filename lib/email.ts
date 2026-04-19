type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

/**
 * Minimal Resend wrapper. Fires off a transactional email if RESEND_API_KEY and
 * RESEND_FROM are configured; otherwise logs the payload and returns silently
 * so local dev and preview environments don't break.
 */
export async function sendEmail({ to, subject, html, text, replyTo }: SendArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    console.info('[email] RESEND not configured — would have sent:', { to, subject });
    return { sent: false, reason: 'not_configured' as const };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      reply_to: replyTo,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('[email] Resend send failed:', res.status, body);
    return { sent: false, reason: 'send_failed' as const, status: res.status };
  }

  return { sent: true };
}

export function adminEmail(): string | null {
  return process.env.ADMIN_EMAIL || null;
}
