import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireOnboardedUser } from '@/lib/auth';
import {
  getPlaybook,
  listOrgPlaybookRequests,
  latestStatus,
} from '@/lib/playbooks';
import StatusTracker from '@/components/portal/StatusTracker';
import RequestForm from './RequestForm';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const playbook = await getPlaybook(params.slug);
  return {
    title: playbook ? `${playbook.title} — TapticoAI` : 'Playbook — TapticoAI',
  };
}

export default async function PlaybookPage({ params }: { params: { slug: string } }) {
  const user = await requireOnboardedUser();
  const playbook = await getPlaybook(params.slug);

  if (!playbook) notFound();

  const requests = user.orgId
    ? await listOrgPlaybookRequests(user.orgId, playbook.slug)
    : [];
  const status = latestStatus(requests);

  return (
    <div className="space-y-8 max-w-3xl">
      <nav className="text-sm">
        <Link href="/playbooks" className="text-brand-muted hover:text-white">
          ← All playbooks
        </Link>
      </nav>

      <header className="space-y-3">
        {playbook.tags[0] && (
          <p className="text-xs uppercase tracking-wide text-brand-muted">{playbook.tags[0]}</p>
        )}
        <h1 className="text-3xl font-semibold">{playbook.title}</h1>
        {playbook.tagline && <p className="text-brand-muted">{playbook.tagline}</p>}
      </header>

      <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
        <h2 className="text-sm uppercase tracking-wide text-brand-muted mb-2">What this does</h2>
        <p className="text-white leading-relaxed whitespace-pre-line">{playbook.body}</p>
      </section>

      <section className="rounded-xl border border-brand-border bg-brand-surface p-6 space-y-4">
        <h2 className="text-sm uppercase tracking-wide text-brand-muted">Status</h2>
        <StatusTracker status={status} />
        {requests.length > 0 && (
          <p className="text-xs text-brand-muted">
            Last updated {new Date(requests[0].updatedAt).toLocaleString()}
          </p>
        )}
      </section>

      <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
        <h2 className="text-lg font-medium">Request this playbook</h2>
        <p className="text-brand-muted text-sm mt-1 mb-4">
          Tell us what you need. Our team picks it up and delivers the result — usually within 24
          hours.
        </p>
        <RequestForm slug={playbook.slug} />
      </section>

      {requests.length > 0 && (
        <section>
          <h2 className="text-sm uppercase tracking-wide text-brand-muted mb-2">
            Previous requests
          </h2>
          <ul className="divide-y divide-brand-border border border-brand-border rounded-xl bg-brand-surface">
            {requests.map((r) => (
              <li key={r.id} className="p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm">
                    {new Date(r.createdAt).toLocaleString()}
                  </p>
                  {r.notes && (
                    <p className="text-brand-muted text-sm mt-1 line-clamp-3">{r.notes}</p>
                  )}
                </div>
                <span className="text-xs uppercase tracking-wide text-brand-muted">{r.status.replace('_', ' ')}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
