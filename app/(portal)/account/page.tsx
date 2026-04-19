import { requirePortalUser } from '@/lib/auth';
import AccountForm from './AccountForm';

export const metadata = {
  title: 'Account — TapticoAI',
};

export default async function AccountPage() {
  const user = await requirePortalUser();

  return (
    <div className="space-y-8 max-w-2xl">
      <header>
        <h1 className="text-3xl font-semibold">Account</h1>
        <p className="text-brand-muted mt-2">
          Update your profile and view your organization.
        </p>
      </header>

      <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
        <h2 className="text-lg font-medium mb-4">Profile</h2>
        <AccountForm
          initialFullName={user.fullName}
          initialCompany={user.company ?? ''}
          email={user.email ?? ''}
        />
      </section>

      <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
        <h2 className="text-lg font-medium">Organization</h2>
        <p className="text-brand-muted text-sm mt-1">
          This is the workspace your data is scoped to.
        </p>
        <dl className="mt-4 grid gap-3 text-sm">
          <div className="flex justify-between border-b border-brand-border/60 pb-2">
            <dt className="text-brand-muted">Name</dt>
            <dd className="text-white">{user.orgName ?? '—'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-brand-muted">Org ID</dt>
            <dd className="font-mono text-xs text-white/80">{user.orgId ?? '—'}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
