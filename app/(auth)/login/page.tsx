import Link from 'next/link';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Log in — TapticoAI',
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string; error?: string };
}) {
  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl p-8 shadow-xl">
      <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
      <p className="text-brand-muted mb-6 text-sm">
        Log in to access your Taptico workspace.
      </p>

      <LoginForm next={searchParams.next} initialError={searchParams.error} />

      <p className="mt-6 text-sm text-brand-muted text-center">
        New here?{' '}
        <Link href="/signup" className="text-brand-white hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
