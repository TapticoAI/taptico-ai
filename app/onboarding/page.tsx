import { requirePortalUser } from '@/lib/auth';
import Wizard from './Wizard';

export const metadata = {
  title: 'Get set up — TapticoAI',
};

export default async function OnboardingPage() {
  const user = await requirePortalUser();
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || '';

  return (
    <Wizard
      initialCompany={user.company ?? ''}
      initialRole={user.role ?? ''}
      initialUsesTapticoKey={user.usesTapticoKey}
      initialKeyLast4={user.anthropicKeyLast4}
      firstName={user.firstName}
      discordUrl={discordUrl}
    />
  );
}
