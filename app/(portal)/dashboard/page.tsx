import Link from 'next/link';
import { requireOnboardedUser } from '@/lib/auth';
import { listPlaybooks } from '@/lib/playbooks';

export const metadata = {
  title: 'Dashboard — TapticoAI',
};

export default async function DashboardPage() {
  const user = await requireOnboardedUser();
  const playbooks = await listPlaybooks();

  return (
    <div className="space-y-10">
      <header>
        <p className="text-brand-muted text-sm">
          {user.orgName ? `${user.orgName}` : 'Your workspace'}
        </p>
        <h1 className="text-3xl font-semibold mt-1">Welcome back, {user.firstName}</h1>
        <p className="text-brand-muted mt-2">
          {user.usesTapticoKey
            ? "Running on Taptico's Anthropic key."
            : `Running on your own Anthropic key ending in ••••${user.anthropicKeyLast4 ?? '****'}.`}
        </p>
      </header>

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-semibold">Your playbooks</h2>
          <Link href="/playbooks" className="text-sm text-brand-muted hover:text-white">
            View all →
          </Link>
        </div>

        {playbooks.length === 0 ? (
          <p className="text-brand-muted text-sm">
            Your playbooks haven't loaded yet — check back in a moment.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {playbooks.map((p) => (
              <article
                key={p.id}
                className="rounded-xl border border-brand-border bg-brand-surface p-6 flex flex-col"
              >
                <h3 className="text-lg font-medium">{p.title}</h3>
                {p.tagline && (
                  <p className="text-brand-muted text-sm mt-2 flex-1">{p.tagline}</p>
                )}
                <Link
                  href={`/playbooks/${p.slug}`}
                  className="portal-button mt-4 inline-flex w-fit"
                >
                  Launch
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
