import { requirePortalUser } from '@/lib/auth';

export const metadata = {
  title: 'Dashboard — TapticoAI',
};

export default async function DashboardPage() {
  const user = await requirePortalUser();

  return (
    <div className="space-y-8">
      <header>
        <p className="text-brand-muted text-sm">Welcome back</p>
        <h1 className="text-3xl font-semibold mt-1">
          Hi, {user.firstName} 👋
        </h1>
        <p className="text-brand-muted mt-2">
          {user.orgName
            ? `You're signed in to ${user.orgName}.`
            : "You're signed in to your Taptico workspace."}
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-brand-border bg-brand-surface p-6">
          <h2 className="text-lg font-medium">Your workspace</h2>
          <p className="text-brand-muted text-sm mt-1">
            Manage your profile, company details, and org membership.
          </p>
          <a href="/account" className="portal-button mt-4 inline-flex">
            Go to account
          </a>
        </div>
        <div className="rounded-xl border border-brand-border bg-brand-surface p-6">
          <h2 className="text-lg font-medium">Coming soon</h2>
          <p className="text-brand-muted text-sm mt-1">
            Playbooks, voice memos, and your AI workforce will appear here.
          </p>
        </div>
      </section>
    </div>
  );
}
