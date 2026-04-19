'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    ),
  },
  {
    label: 'Account',
    href: '/account',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    ),
  },
];

export default function Sidebar({
  fullName,
  email,
  orgName,
}: {
  fullName: string;
  email: string | null;
  orgName: string | null;
}) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-brand-black border-r border-brand-border/60 flex flex-col">
      <div className="px-5 py-6 border-b border-brand-border/60">
        <Link href="/dashboard" className="inline-flex items-center">
          <Image
            src="/taptico-logo-white.png"
            alt="Taptico"
            width={140}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
                active
                  ? 'bg-brand-navy text-white'
                  : 'text-brand-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-brand-border/60 px-4 py-4 text-xs">
        <p className="text-white font-medium truncate">{fullName}</p>
        {email && <p className="text-brand-muted truncate">{email}</p>}
        {orgName && <p className="text-brand-muted truncate mt-1">{orgName}</p>}
        <form action="/auth/logout" method="post" className="mt-3">
          <button type="submit" className="portal-button-secondary w-full text-sm">
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
