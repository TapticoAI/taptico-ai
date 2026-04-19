import Link from 'next/link';
import Image from 'next/image';
import { requirePortalUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const user = await requirePortalUser();
  if (user.onboardedAt) redirect('/dashboard');

  return (
    <main className="min-h-screen flex flex-col bg-brand-black text-brand-white">
      <header className="px-6 py-5 border-b border-brand-border/60 flex items-center justify-between">
        <Link href="/dashboard" className="inline-flex items-center gap-2">
          <Image
            src="/taptico-logo-white.png"
            alt="Taptico"
            width={140}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>
        <form action="/auth/logout" method="post">
          <button type="submit" className="text-sm text-brand-muted hover:text-white transition">
            Log out
          </button>
        </form>
      </header>
      <section className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-xl">{children}</div>
      </section>
    </main>
  );
}
