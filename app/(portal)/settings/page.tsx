import { requireOnboardedUser } from '@/lib/auth';
import ApiKeyForm from './ApiKeyForm';

export const metadata = {
  title: 'Settings — TapticoAI',
};

export default async function SettingsPage() {
  const user = await requireOnboardedUser();

  return (
    <div className="space-y-8 max-w-2xl">
      <header>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-brand-muted mt-2">Manage how your workspace runs playbooks.</p>
      </header>

      <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
        <h2 className="text-lg font-medium">Anthropic API key</h2>
        <p className="text-brand-muted text-sm mt-1">
          Playbooks run on Claude. Use your own key or fall back to Taptico's.
        </p>
        <div className="mt-5">
          <ApiKeyForm
            initialUsesTapticoKey={user.usesTapticoKey}
            initialKeyLast4={user.anthropicKeyLast4}
          />
        </div>
      </section>
    </div>
  );
}
