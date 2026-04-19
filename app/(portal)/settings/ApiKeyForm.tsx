'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ApiKeyForm({
  initialUsesTapticoKey,
  initialKeyLast4,
}: {
  initialUsesTapticoKey: boolean;
  initialKeyLast4: string | null;
}) {
  const router = useRouter();
  const [usesTaptico, setUsesTaptico] = useState(initialUsesTapticoKey);
  const [keyLast4, setKeyLast4] = useState(initialKeyLast4);
  const [apiKey, setApiKey] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function toggleTapticoKey(nextUsesTaptico: boolean) {
    setStatus('saving');
    setMessage(null);
    const res = await fetch('/api/settings/api-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        nextUsesTaptico ? { useTapticoKey: true } : { useTapticoKey: false, apiKey: apiKey.trim() }
      ),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setStatus('error');
      setMessage(body.error || 'Could not save.');
      return;
    }
    const body = (await res.json().catch(() => ({}))) as { last4?: string };
    setUsesTaptico(nextUsesTaptico);
    if (!nextUsesTaptico) {
      setKeyLast4(body.last4 ?? keyLast4);
      setApiKey('');
      setShowInput(false);
    } else {
      setKeyLast4(null);
    }
    setStatus('saved');
    setMessage(nextUsesTaptico ? 'Switched to Taptico\'s key.' : 'Your key is saved.');
    router.refresh();
  }

  async function saveOwnKey(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = apiKey.trim();
    if (!trimmed.startsWith('sk-ant-')) {
      setStatus('error');
      setMessage('That doesn\'t look like an Anthropic API key.');
      return;
    }
    await toggleTapticoKey(false);
  }

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-brand-border bg-brand-black p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">
              {usesTaptico ? "Using Taptico's key" : 'Using your own key'}
            </p>
            <p className="text-brand-muted text-xs mt-0.5">
              {usesTaptico
                ? "We're covering inference cost while you evaluate."
                : keyLast4
                ? `Encrypted in Vault. Ends in ••••${keyLast4}.`
                : 'Encrypted in Vault.'}
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <span className="sr-only">Use Taptico's key</span>
            <input
              type="checkbox"
              className="peer sr-only"
              checked={usesTaptico}
              disabled={status === 'saving'}
              onChange={(e) => {
                if (e.target.checked) {
                  toggleTapticoKey(true);
                } else {
                  setUsesTaptico(false);
                  setShowInput(true);
                }
              }}
            />
            <span className="w-11 h-6 rounded-full bg-brand-border peer-checked:bg-brand-navy transition relative">
              <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
            </span>
          </label>
        </div>
      </div>

      {(!usesTaptico && (showInput || !keyLast4)) && (
        <form onSubmit={saveOwnKey} className="space-y-3">
          <div>
            <label htmlFor="apiKey" className="block text-sm mb-1.5">
              Anthropic API key
            </label>
            <input
              id="apiKey"
              type="password"
              autoComplete="off"
              required
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="portal-input font-mono"
              placeholder="sk-ant-..."
            />
            <p className="text-xs text-brand-muted mt-1">
              Get a key at{' '}
              <a
                href="https://console.anthropic.com/settings/keys"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-white"
              >
                console.anthropic.com
              </a>
              . We encrypt it with Supabase Vault.
            </p>
          </div>
          <button type="submit" disabled={status === 'saving'} className="portal-button">
            {status === 'saving' ? 'Saving…' : keyLast4 ? 'Replace key' : 'Save key'}
          </button>
        </form>
      )}

      {!usesTaptico && keyLast4 && !showInput && (
        <button
          type="button"
          onClick={() => setShowInput(true)}
          className="portal-button-secondary"
        >
          Replace key
        </button>
      )}

      {message && (
        <p
          className={`text-sm rounded-md px-3 py-2 border ${
            status === 'error'
              ? 'text-red-400 bg-red-500/10 border-red-500/30'
              : 'text-white bg-brand-navy/20 border-brand-navy/60'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
