'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Step = 1 | 2 | 3 | 4;

export default function Wizard({
  initialCompany,
  initialRole,
  initialUsesTapticoKey,
  initialKeyLast4,
  firstName,
  discordUrl,
}: {
  initialCompany: string;
  initialRole: string;
  initialUsesTapticoKey: boolean;
  initialKeyLast4: string | null;
  firstName: string;
  discordUrl: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);

  const [company, setCompany] = useState(initialCompany);
  const [role, setRole] = useState(initialRole);

  const [keyChoice, setKeyChoice] = useState<'own' | 'taptico'>(
    initialUsesTapticoKey ? 'taptico' : 'own'
  );
  const [apiKey, setApiKey] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submitStep1(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch('/api/onboarding/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, role }),
    });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || 'Could not save — please try again.');
      return;
    }
    setStep(2);
  }

  async function submitStep2(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (keyChoice === 'own') {
      const trimmed = apiKey.trim();
      if (!trimmed.startsWith('sk-ant-')) {
        setError('That doesn\'t look like an Anthropic API key. It should start with "sk-ant-".');
        return;
      }
    }

    setLoading(true);
    const res = await fetch('/api/onboarding/api-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        keyChoice === 'own' ? { useTapticoKey: false, apiKey: apiKey.trim() } : { useTapticoKey: true }
      ),
    });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || 'Could not save the key — please try again.');
      return;
    }
    setApiKey('');
    setStep(3);
  }

  async function finish() {
    setError(null);
    setLoading(true);
    const res = await fetch('/api/onboarding/complete', { method: 'POST' });
    if (!res.ok) {
      setLoading(false);
      const body = await res.json().catch(() => ({}));
      setError(body.error || 'Could not finish — please try again.');
      return;
    }
    router.replace('/dashboard');
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <ProgressBar step={step} />

      <div className="bg-brand-surface border border-brand-border rounded-xl p-8 shadow-xl">
        {step === 1 && (
          <form onSubmit={submitStep1} className="space-y-5">
            <header>
              <h1 className="text-2xl font-semibold">Welcome, {firstName} 👋</h1>
              <p className="text-brand-muted mt-1 text-sm">
                Two quick details and we'll get your workspace set up.
              </p>
            </header>

            <div>
              <label htmlFor="company" className="block text-sm mb-1.5">
                Company name
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="portal-input"
                placeholder="Acme Insurance"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm mb-1.5">
                Your role
              </label>
              <input
                id="role"
                name="role"
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="portal-input"
                placeholder="Insurance agent / Owner / Ops…"
              />
            </div>

            <ErrorBox message={error} />

            <button type="submit" disabled={loading} className="portal-button w-full">
              {loading ? 'Saving…' : 'Continue'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={submitStep2} className="space-y-5">
            <header>
              <h1 className="text-2xl font-semibold">Connect your Anthropic key</h1>
              <p className="text-brand-muted mt-1 text-sm">
                Playbooks run on Claude. You can bring your own key (recommended) or use Taptico's key
                while you get comfortable.
              </p>
            </header>

            <div className="space-y-3">
              <label
                className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition ${
                  keyChoice === 'own'
                    ? 'border-brand-navy bg-brand-navy/10'
                    : 'border-brand-border hover:border-brand-navy/60'
                }`}
              >
                <input
                  type="radio"
                  name="keyChoice"
                  value="own"
                  checked={keyChoice === 'own'}
                  onChange={() => setKeyChoice('own')}
                  className="mt-1 accent-brand-navy"
                />
                <span>
                  <span className="block font-medium">Use my own Anthropic key</span>
                  <span className="block text-brand-muted text-sm mt-0.5">
                    You pay Anthropic directly. Get one at{' '}
                    <a
                      href="https://console.anthropic.com/settings/keys"
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-white"
                    >
                      console.anthropic.com
                    </a>
                    .
                  </span>
                </span>
              </label>

              <label
                className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition ${
                  keyChoice === 'taptico'
                    ? 'border-brand-navy bg-brand-navy/10'
                    : 'border-brand-border hover:border-brand-navy/60'
                }`}
              >
                <input
                  type="radio"
                  name="keyChoice"
                  value="taptico"
                  checked={keyChoice === 'taptico'}
                  onChange={() => setKeyChoice('taptico')}
                  className="mt-1 accent-brand-navy"
                />
                <span>
                  <span className="block font-medium">Use Taptico's key for now</span>
                  <span className="block text-brand-muted text-sm mt-0.5">
                    We'll cover the inference cost while you evaluate. Switch anytime in Settings.
                  </span>
                </span>
              </label>
            </div>

            {keyChoice === 'own' && (
              <div>
                <label htmlFor="apiKey" className="block text-sm mb-1.5">
                  Anthropic API key
                </label>
                <input
                  id="apiKey"
                  name="apiKey"
                  type="password"
                  autoComplete="off"
                  required
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="portal-input font-mono"
                  placeholder="sk-ant-..."
                />
                {initialKeyLast4 && (
                  <p className="text-xs text-brand-muted mt-1">
                    A key ending in ••••{initialKeyLast4} is already stored. Submitting a new key replaces it.
                  </p>
                )}
                <p className="text-xs text-brand-muted mt-1">
                  Your key is encrypted in Supabase Vault. We never store it in plaintext.
                </p>
              </div>
            )}

            <ErrorBox message={error} />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="portal-button-secondary flex-1"
              >
                Back
              </button>
              <button type="submit" disabled={loading} className="portal-button flex-[2]">
                {loading ? 'Saving…' : 'Continue'}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <header>
              <h1 className="text-2xl font-semibold">Join the community</h1>
              <p className="text-brand-muted mt-1 text-sm">
                Get product updates, playbook announcements, and direct access to the team on Discord.
              </p>
            </header>

            {discordUrl ? (
              <a
                href={discordUrl}
                target="_blank"
                rel="noreferrer"
                className="portal-button w-full"
              >
                Open Discord invite
              </a>
            ) : (
              <p className="text-sm text-brand-muted bg-brand-black border border-brand-border rounded-md px-3 py-2">
                Discord invite link hasn't been configured yet — we'll email it shortly.
              </p>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="portal-button-secondary flex-1"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="portal-button flex-[2]"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <header>
              <h1 className="text-2xl font-semibold">You're all set, {firstName} 🎉</h1>
              <p className="text-brand-muted mt-1 text-sm">
                Your workspace is ready. Next up: browse your playbooks and request your first run.
              </p>
            </header>

            <ul className="space-y-2 text-sm">
              <Checklist label="Workspace created" />
              <Checklist
                label={
                  keyChoice === 'taptico'
                    ? "Running on Taptico's Anthropic key"
                    : 'Your Anthropic key is encrypted in Vault'
                }
              />
              <Checklist label="Discord invite shared" />
            </ul>

            <ErrorBox message={error} />

            <button onClick={finish} disabled={loading} className="portal-button w-full">
              {loading ? 'Finishing…' : 'Go to dashboard'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressBar({ step }: { step: Step }) {
  const labels = ['Profile', 'API key', 'Community', 'Done'];
  return (
    <ol className="flex items-center gap-2 text-xs">
      {labels.map((label, idx) => {
        const num = (idx + 1) as Step;
        const active = step === num;
        const done = step > num;
        return (
          <li key={label} className="flex-1">
            <div
              className={`h-1 rounded-full transition ${
                done ? 'bg-brand-navy' : active ? 'bg-white' : 'bg-brand-border'
              }`}
            />
            <span
              className={`mt-1 block ${
                active ? 'text-white' : done ? 'text-brand-navy' : 'text-brand-muted'
              }`}
            >
              {num}. {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function Checklist({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-navy text-white text-[10px]">
        ✓
      </span>
      {label}
    </li>
  );
}

function ErrorBox({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
      {message}
    </p>
  );
}
