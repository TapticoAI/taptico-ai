import type { PlaybookRequestStatus } from '@/lib/playbooks';

const LABELS: Record<PlaybookRequestStatus, string> = {
  not_started: 'Not started',
  requested: 'Requested',
  in_progress: 'In progress',
  delivered: 'Delivered',
};

const STYLES: Record<PlaybookRequestStatus, string> = {
  not_started: 'bg-brand-black text-brand-muted border-brand-border',
  requested: 'bg-brand-navy/20 text-white border-brand-navy',
  in_progress: 'bg-amber-500/10 text-amber-300 border-amber-500/40',
  delivered: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40',
};

export default function StatusPill({ status }: { status: PlaybookRequestStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide border rounded-full px-2 py-0.5 ${STYLES[status]}`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {LABELS[status]}
    </span>
  );
}
