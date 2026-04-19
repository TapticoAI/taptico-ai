import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export type PortalUser = {
  id: string;
  email: string | null;
  fullName: string;
  firstName: string;
  company: string | null;
  role: string | null;
  orgId: string | null;
  orgName: string | null;
  usesTapticoKey: boolean;
  anthropicKeyLast4: string | null;
  onboardedAt: string | null;
};

function pickFullName(meta: Record<string, unknown> | null | undefined, email: string | null): string {
  const raw =
    (meta?.full_name as string | undefined) ||
    (meta?.name as string | undefined) ||
    '';
  if (raw.trim()) return raw.trim();
  if (email) return email.split('@')[0];
  return 'there';
}

export async function getPortalUser(): Promise<PortalUser | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const metaFullName = pickFullName(user.user_metadata, user.email ?? null);

  const { data: profile } = await supabase
    .from('profiles')
    .select(
      'full_name, company, role, onboarded_at, org_id, organizations:org_id (id, name, uses_taptico_key, anthropic_key_last4)'
    )
    .eq('id', user.id)
    .maybeSingle();

  const profileName = (profile?.full_name as string | undefined) || metaFullName;
  const org = profile?.organizations as
    | { id: string; name: string; uses_taptico_key: boolean; anthropic_key_last4: string | null }
    | null
    | undefined;

  return {
    id: user.id,
    email: user.email ?? null,
    fullName: profileName,
    firstName: profileName.split(' ')[0] || metaFullName,
    company: (profile?.company as string | undefined) ?? (user.user_metadata?.company as string | undefined) ?? null,
    role: (profile?.role as string | undefined) ?? null,
    orgId: org?.id ?? (profile?.org_id as string | undefined) ?? null,
    orgName: org?.name ?? null,
    usesTapticoKey: org?.uses_taptico_key ?? true,
    anthropicKeyLast4: org?.anthropic_key_last4 ?? null,
    onboardedAt: (profile?.onboarded_at as string | undefined) ?? null,
  };
}

export async function requirePortalUser(): Promise<PortalUser> {
  const user = await getPortalUser();
  if (!user) redirect('/login');
  return user;
}

/**
 * Portal pages other than /onboarding should call this — it bounces
 * authenticated-but-not-onboarded users to the wizard.
 */
export async function requireOnboardedUser(): Promise<PortalUser> {
  const user = await requirePortalUser();
  if (!user.onboardedAt) redirect('/onboarding');
  return user;
}
