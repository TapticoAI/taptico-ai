import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export type PortalUser = {
  id: string;
  email: string | null;
  fullName: string;
  firstName: string;
  company: string | null;
  orgId: string | null;
  orgName: string | null;
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

  const fullName = pickFullName(user.user_metadata, user.email ?? null);
  const firstName = fullName.split(' ')[0];

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, company, org_id, organizations:org_id (id, name)')
    .eq('id', user.id)
    .maybeSingle();

  const profileName = (profile?.full_name as string | undefined) || fullName;
  const org = profile?.organizations as { id: string; name: string } | null | undefined;

  return {
    id: user.id,
    email: user.email ?? null,
    fullName: profileName,
    firstName: profileName.split(' ')[0] || firstName,
    company: (profile?.company as string | undefined) ?? (user.user_metadata?.company as string | undefined) ?? null,
    orgId: org?.id ?? (profile?.org_id as string | undefined) ?? null,
    orgName: org?.name ?? null,
  };
}

export async function requirePortalUser(): Promise<PortalUser> {
  const user = await getPortalUser();
  if (!user) redirect('/login');
  return user;
}
