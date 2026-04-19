import Link from 'next/link';
import SignupForm from './SignupForm';

export const metadata = {
  title: 'Create account — TapticoAI',
};

export default function SignupPage() {
  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl p-8 shadow-xl">
      <h1 className="text-2xl font-semibold mb-1">Create your account</h1>
      <p className="text-brand-muted mb-6 text-sm">
        Set up your Taptico workspace in seconds.
      </p>

      <SignupForm />

      <p className="mt-6 text-sm text-brand-muted text-center">
        Already have an account?{' '}
        <Link href="/login" className="text-brand-white hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
