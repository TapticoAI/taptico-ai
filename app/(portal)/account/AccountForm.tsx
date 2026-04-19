'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AccountForm({
  initialFullName,
  initialCompany,
  email,
}: {
  initialFullName: string;
  initialCompany: string;
  email: string;
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState(initialFullName);
  const [company, setCompany] = useState(initialCompany);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('saving');
    setMessage(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setStatus('error');
      setMessage('Your session expired. Please log in again.');
      return;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ full_name: fullName, company })
      .eq('id', user.id);

    if (profileError) {
      setStatus('error');
      setMessage(profileError.message);
      return;
    }

    const { error: metaError } = await supabase.auth.updateUser({
      data: { full_name: fullName, company },
    });

    if (metaError) {
      setStatus('error');
      setMessage(metaError.message);
      return;
    }

    setStatus('saved');
    setMessage('Profile updated.');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          disabled
          className="portal-input opacity-60 cursor-not-allowed"
        />
      </div>
      <div>
        <label htmlFor="fullName" className="block text-sm mb-1.5">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="portal-input"
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm mb-1.5">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="portal-input"
        />
      </div>

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

      <button type="submit" disabled={status === 'saving'} className="portal-button">
        {status === 'saving' ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  );
}
