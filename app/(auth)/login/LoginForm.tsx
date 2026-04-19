'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

type Mode = 'password' | 'magic';

export default function LoginForm({
  next,
  initialError,
}: {
  next?: string;
  initialError?: string;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const safeNext = next && next.startsWith('/') ? next : '/dashboard';

  async function handlePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.replace(safeNext);
    router.refresh();
  }

  async function handleMagicLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext)}`;
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: false,
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    setInfo(`Check ${email} for a login link. It expires in a few minutes.`);
  }

  return (
    <div className="space-y-5">
      <div className="flex rounded-md bg-brand-black border border-brand-border p-1 text-sm">
        <button
          type="button"
          onClick={() => {
            setMode('password');
            setInfo(null);
            setError(null);
          }}
          className={`flex-1 rounded px-3 py-1.5 transition ${
            mode === 'password' ? 'bg-brand-navy text-white' : 'text-brand-muted hover:text-white'
          }`}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('magic');
            setInfo(null);
            setError(null);
          }}
          className={`flex-1 rounded px-3 py-1.5 transition ${
            mode === 'magic' ? 'bg-brand-navy text-white' : 'text-brand-muted hover:text-white'
          }`}
        >
          Magic link
        </button>
      </div>

      {mode === 'password' ? (
        <form onSubmit={handlePassword} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="portal-input"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="portal-input"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="portal-button w-full">
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleMagicLink} className="space-y-4">
          <div>
            <label htmlFor="magic-email" className="block text-sm mb-1.5">
              Email
            </label>
            <input
              id="magic-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="portal-input"
              placeholder="you@company.com"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
              {error}
            </p>
          )}
          {info && (
            <p className="text-sm text-white bg-brand-navy/20 border border-brand-navy/60 rounded-md px-3 py-2">
              {info}
            </p>
          )}

          <button type="submit" disabled={loading} className="portal-button w-full">
            {loading ? 'Sending…' : 'Email me a login link'}
          </button>
        </form>
      )}
    </div>
  );
}
