import { createClient } from '@/lib/supabase/server';

export type Playbook = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  body: string;
  tags: string[];
  accessTier: string;
};

export async function listPlaybooks(): Promise<Playbook[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('resources')
    .select('id, slug, title, tagline, body, tags, access_tier, sort_order')
    .eq('type', 'playbook')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[playbooks] list failed', error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    tagline: (row.tagline as string | null) ?? null,
    body: row.body as string,
    tags: (row.tags as string[] | null) ?? [],
    accessTier: row.access_tier as string,
  }));
}

export async function getPlaybook(slug: string): Promise<Playbook | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('resources')
    .select('id, slug, title, tagline, body, tags, access_tier')
    .eq('type', 'playbook')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: data.id as string,
    slug: data.slug as string,
    title: data.title as string,
    tagline: (data.tagline as string | null) ?? null,
    body: data.body as string,
    tags: (data.tags as string[] | null) ?? [],
    accessTier: data.access_tier as string,
  };
}

export type PlaybookRequestStatus = 'not_started' | 'requested' | 'in_progress' | 'delivered';

export type PlaybookRequest = {
  id: string;
  playbookSlug: string;
  status: Exclude<PlaybookRequestStatus, 'not_started'>;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function listOrgPlaybookRequests(
  orgId: string,
  slug?: string
): Promise<PlaybookRequest[]> {
  const supabase = createClient();
  let query = supabase
    .from('playbook_requests')
    .select('id, playbook_slug, status, notes, created_at, updated_at')
    .eq('org_id', orgId)
    .order('created_at', { ascending: false });

  if (slug) query = query.eq('playbook_slug', slug);

  const { data, error } = await query;
  if (error) {
    console.error('[playbooks] requests list failed', error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id as string,
    playbookSlug: row.playbook_slug as string,
    status: row.status as Exclude<PlaybookRequestStatus, 'not_started'>,
    notes: (row.notes as string | null) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }));
}

export function latestStatus(requests: PlaybookRequest[]): PlaybookRequestStatus {
  if (!requests.length) return 'not_started';
  return requests[0].status;
}
