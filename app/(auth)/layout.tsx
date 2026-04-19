import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col bg-brand-black text-brand-white">
      <header className="px-6 py-5 border-b border-brand-border/60">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/taptico-logo-white.png"
            alt="Taptico"
            width={140}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>
      </header>
      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}
