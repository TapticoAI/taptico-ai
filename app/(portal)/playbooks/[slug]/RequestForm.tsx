'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RequestForm({ slug }: { slug: string }) {
  const router = useRouter();
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!notes.trim()) {
      setStatus('error');
      setMessage('Please tell us what you need.');
      return;
    }
    setStatus('saving');
    setMessage(null);

    const res = await fetch(`/api/playbooks/${slug}/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: notes.trim() }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setStatus('error');
      setMessage(body.error || 'Could not submit — please try again.');
      return;
    }

    setNotes('');
    setStatus('saved');
    setMessage('Request received — we\'re on it.');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label htmlFor="notes" className="block text-sm">
        Tell us what you need
      </label>
      <textarea
        id="notes"
        name="notes"
        rows={4}
        required
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="portal-input resize-y"
        placeholder="E.g. Run this for my Q2 renewals — focus on commercial auto, skip personal lines."
      />

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
        {status === 'saving' ? 'Submitting…' : 'Request this playbook'}
      </button>
    </form>
  );
}
