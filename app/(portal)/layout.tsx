import Sidebar from '@/components/portal/Sidebar';
import { requirePortalUser } from '@/lib/auth';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await requirePortalUser();

  return (
    <div className="min-h-screen flex bg-brand-black text-brand-white">
      <Sidebar fullName={user.fullName} email={user.email} orgName={user.orgName} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
