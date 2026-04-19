import Link from 'next/link';
import { requireOnboardedUser } from '@/lib/auth';
import { listOrgPlaybookRequests, listPlaybooks, latestStatus } from '@/lib/playbooks';
import StatusPill from '@/components/portal/StatusPill';

export const metadata = {
  title: 'Playbooks — TapticoAI',
};

export default async function PlaybooksPage() {
  const user = await requireOnboardedUser();
  const [playbooks, requests] = await Promise.all([
    listPlaybooks(),
    user.orgId ? listOrgPlaybookRequests(user.orgId) : Promise.resolve([]),
  ]);

  const statusBySlug = new Map<string, ReturnType<typeof latestStatus>>();
  for (const p of playbooks) {
    statusBySlug.set(p.slug, latestStatus(requests.filter((r) => r.playbookSlug === p.slug)));
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Playbooks</h1>
        <p className="text-brand-muted mt-2">
          Request a playbook and our team delivers it. You stay in control — nothing auto-fires.
        </p>
      </header>

      {playbooks.length === 0 ? (
        <p className="text-brand-muted">No playbooks are available yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {playbooks.map((p) => {
            const status = statusBySlug.get(p.slug) ?? 'not_started';
            return (
              <article
                key={p.id}
                className="rounded-xl border border-brand-border bg-brand-surface p-6 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-medium leading-snug">{p.title}</h2>
                  <StatusPill status={status} />
                </div>
                {p.tagline && <p className="text-brand-muted text-sm mt-2 flex-1">{p.tagline}</p>}
                {p.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5 mt-3">
                    {p.tags.slice(0, 3).map((tag) => (
                      <li
                        key={tag}
                        className="text-[11px] uppercase tracking-wide text-brand-muted bg-brand-black border border-brand-border rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={`/playbooks/${p.slug}`}
                  className="portal-button mt-5 inline-flex w-fit"
                >
                  Launch
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
