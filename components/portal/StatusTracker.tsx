import type { PlaybookRequestStatus } from '@/lib/playbooks';

const STEPS: { id: PlaybookRequestStatus; label: string }[] = [
  { id: 'not_started', label: 'Not started' },
  { id: 'requested', label: 'Requested' },
  { id: 'in_progress', label: 'In progress' },
  { id: 'delivered', label: 'Delivered' },
];

const ORDER: Record<PlaybookRequestStatus, number> = {
  not_started: 0,
  requested: 1,
  in_progress: 2,
  delivered: 3,
};

export default function StatusTracker({ status }: { status: PlaybookRequestStatus }) {
  const current = ORDER[status];

  return (
    <ol className="flex items-center gap-2">
      {STEPS.map((step, idx) => {
        const stepIdx = ORDER[step.id];
        const active = stepIdx === current;
        const done = stepIdx < current;
        return (
          <li key={step.id} className="flex-1">
            <div
              className={`h-1.5 rounded-full transition ${
                done ? 'bg-brand-navy' : active ? 'bg-white' : 'bg-brand-border'
              }`}
            />
            <span
              className={`mt-2 text-xs block ${
                active ? 'text-white font-medium' : done ? 'text-brand-navy' : 'text-brand-muted'
              }`}
            >
              {idx + 1}. {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
