'use client';
import { useState, FormEvent } from 'react';

function SignupForm({ id }: { id: string }) {
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, promoCode: promoCode.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setPromoSuccess(!!data.promoApplied);
        setStatus('success');
      } else {
        setErrorMsg(data.error || 'Something went wrong. Try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Connection failed. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center animate-success-pop">
        <div className="w-[72px] h-[72px] mx-auto mb-6 bg-[rgba(21,93,252,0.15)] border border-[rgba(80,162,255,0.3)] rounded-full flex items-center justify-center">
          <svg className="w-9 h-9" viewBox="0 0 36 36">
            <path
              className="animate-check-draw"
              d="M8 18 L15 25 L28 11"
              stroke="#50a2ff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
        <div className="text-xl font-bold text-white mb-2">You&apos;re on the list.</div>
        <div className="text-sm text-brand-gray leading-relaxed">
          We&apos;ll be in touch when your AI workforce is ready.
        </div>
        {promoSuccess && (
          <div className="text-sm text-brand-lightblue mt-3 px-4 py-2.5 bg-[rgba(21,93,252,0.12)] border border-[rgba(80,162,255,0.25)] rounded-xl">
            Your promo code has been applied.
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          id={`${id}-email`}
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
          placeholder="Your email address"
          required
          className="w-full bg-[rgba(255,255,255,0.04)] border border-brand-border rounded-xl px-4 py-4 text-white text-[15px] font-poppins placeholder:text-brand-dim outline-none transition-all duration-200 focus:border-brand-blue focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[0_0_0_1px_rgba(21,93,252,0.4),0_0_20px_rgba(21,93,252,0.15)]"
        />
      </div>

      {id === 'hero' && (
        <>
          <div className="mb-3">
            <input
              id={`${id}-promo`}
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code (optional)"
              className="w-full bg-[rgba(255,255,255,0.04)] border border-brand-border rounded-xl px-4 py-4 text-white text-[15px] font-poppins placeholder:text-brand-dim outline-none transition-all duration-200 focus:border-brand-blue focus:bg-[rgba(255,255,255,0.06)] focus:shadow-[0_0_0_1px_rgba(21,93,252,0.4),0_0_20px_rgba(21,93,252,0.15)]"
            />
          </div>
          <p className="text-center text-xs text-brand-dim mb-5 -mt-1">
            Use code <span className="text-brand-lightblue font-semibold">NicksFirst50</span> at signup
          </p>
        </>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 text-xs font-medium text-red-400 mb-3 px-3 py-2.5 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-lg animate-fade-up">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !email}
        className="w-full bg-brand-blue hover:bg-[#1a6aff] border border-[rgba(80,162,255,0.3)] rounded-xl py-4 text-white text-sm font-bold font-poppins tracking-wide uppercase cursor-pointer transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(21,93,252,0.4),0_0_40px_rgba(21,93,252,0.15)] active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {status === 'loading' ? 'Securing Your Spot...' : 'Reserve Your Spot'}
      </button>

      <p className="text-center text-[11px] text-brand-dim mt-3 leading-relaxed">
        No credit card required. 30-day money-back guarantee.
      </p>
      <p className="text-center text-[11px] text-brand-lightblue mt-2 leading-relaxed">
        Founding Members earn a free month for every referral that signs up with their code.
      </p>
    </form>
  );
}

function GradientDivider() {
  return (
    <div className="w-full h-px opacity-40 bg-gradient-to-r from-transparent via-brand-blue to-transparent" />
  );
}

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-brand-bg font-poppins text-brand-text overflow-x-hidden">
      {/* ─── Fixed Nav ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(3,3,3,0.8)] backdrop-blur-xl border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <img
            src="/taptico-logo-white.png"
            alt="TAPTICO.AI"
            className="h-8"
          />
          <div className="border border-[rgba(80,162,255,0.3)] rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-brand-lightblue">
            Founding Members
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Radial blue glow behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(21,93,252,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 bg-[rgba(21,93,252,0.1)] border border-[rgba(80,162,255,0.2)] rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(21,93,252,0.7)] animate-pulse-dot" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-lightblue">
              Founding Members Program - Limited to 50
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-4">
            Never miss another recital.
          </h1>

          {/* Sub-headline */}
          <p className="text-2xl md:text-3xl font-semibold mb-6">
            Your business <span className="text-brand-lightblue">runs itself.</span> You just tell it what to do.
          </p>

          {/* Subhead */}
          <p className="text-base text-brand-gray leading-relaxed max-w-2xl mx-auto mb-8">
            TapticoOS is your AI workforce. Send a voice memo. A playbook runs. Sales, marketing, operations - handled. You never touch a dashboard. You just live your life.
          </p>

          {/* Proof line */}
          <p className="text-sm italic text-brand-dim leading-relaxed max-w-2xl mx-auto mb-12">
            Built by an Inc 5000 winner with 25 years in the trenches. Launched two radio stations. Grew a restaurant brand named fastest-growing in Atlanta. Worked alongside Coca-Cola, Harley-Davidson, and Live Nation. No engineering team. Just vision and AI.
          </p>

          {/* CTA Box */}
          <div className="relative max-w-md mx-auto">
            {/* Top edge glow */}
            <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-60" />
            <div className="bg-[rgba(11,11,11,0.7)] backdrop-blur-[20px] border border-brand-border rounded-2xl p-8">
              <p className="text-sm font-semibold tracking-widest uppercase text-brand-gray mb-4">
                Founding Member Pricing
              </p>
              <div className="mb-2">
                <span className="text-lg text-brand-dim line-through mr-3">$2,500/mo</span>
                <span className="text-4xl font-bold text-white">$1,500</span>
                <span className="text-lg text-brand-gray ml-1">/month</span>
              </div>
              <p className="text-sm text-brand-gray mb-2">
                Locked for 12 months. 30-day money-back guarantee. Cancel anytime.
              </p>
              <p className="text-sm font-semibold text-brand-lightblue mb-6">
                47 of 50 spots remaining
              </p>
              <SignupForm id="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="max-w-5xl mx-auto px-6">
        <GradientDivider />
      </div>

      {/* ─── How It Works ─── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-lightblue text-center mb-4">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Three steps. Then you go live your life.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-borderlight">
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-brand-dim mb-3">Step One</div>
              <h3 className="text-lg font-bold text-white mb-3">Free discovery call</h3>
              <p className="text-sm text-brand-gray leading-relaxed">
                Our AI agent Disco Dave interviews you (or fill out a quick form). You get a free custom plan showing exactly what AI can do for your business. No commitment, no pitch.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-borderlight">
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-brand-dim mb-3">Step Two</div>
              <h3 className="text-lg font-bold text-white mb-3">We build it in 24 hours</h3>
              <p className="text-sm text-brand-gray leading-relaxed">
                Say the word and we handle everything. Onboarding, configuration, training the system on your business, your industry, your competitors. You bring your own API keys. We do the rest.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-borderlight">
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-brand-dim mb-3">Step Three</div>
              <h3 className="text-lg font-bold text-white mb-3">Send a voice memo. Done.</h3>
              <p className="text-sm text-brand-gray leading-relaxed">
                That&apos;s it. &quot;Run the New Listing Playbook for 112 Main St.&quot; Your playbook fires: social posts go out, listings go live, clients get notified. You go to the recital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="max-w-5xl mx-auto px-6">
        <GradientDivider />
      </div>

      {/* ─── Playbooks Section ─── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-lightblue text-center mb-4">
            Playbooks, Not Dashboards
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            You say the word. The playbook runs.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sales */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-borderlight">
              <div className="w-10 h-10 rounded-xl bg-[rgba(21,93,252,0.12)] border border-[rgba(80,162,255,0.2)] flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-brand-lightblue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Sales playbooks</h3>
              <p className="text-sm text-brand-gray leading-relaxed">
                Prospecting, cold outreach, follow-ups, lead scoring. One command triggers the whole sequence. Personalized to every lead.
              </p>
            </div>

            {/* Content */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-borderlight">
              <div className="w-10 h-10 rounded-xl bg-[rgba(21,93,252,0.12)] border border-[rgba(80,162,255,0.2)] flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-brand-lightblue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Content playbooks</h3>
              <p className="text-sm text-brand-gray leading-relaxed">
                Social posts, blogs, newsletters, ad copy. Written in your voice. Scheduled and published. You never open Canva again.
              </p>
            </div>

            {/* Operations */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-borderlight">
              <div className="w-10 h-10 rounded-xl bg-[rgba(21,93,252,0.12)] border border-[rgba(80,162,255,0.2)] flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-brand-lightblue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Operations playbooks</h3>
              <p className="text-sm text-brand-gray leading-relaxed">
                Client onboarding, check-ins, renewals, scheduling. Your clients feel taken care of because they are.
              </p>
            </div>

            {/* Intel */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-borderlight">
              <div className="w-10 h-10 rounded-xl bg-[rgba(21,93,252,0.12)] border border-[rgba(80,162,255,0.2)] flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-brand-lightblue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Intel playbooks</h3>
              <p className="text-sm text-brand-gray leading-relaxed">
                Morning briefs on your phone. Weekly scorecards. Competitor alerts. Ask a question, get an answer. No login required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="max-w-5xl mx-auto px-6">
        <GradientDivider />
      </div>

      {/* ─── Quote Section ─── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-bold italic leading-tight mb-6">
            &quot;We learned AI so you don&apos;t have to.&quot;
          </blockquote>
          <cite className="text-sm font-semibold text-brand-gray not-italic tracking-wide">
            Nick Tapp, Founder
          </cite>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="max-w-5xl mx-auto px-6">
        <GradientDivider />
      </div>

      {/* ─── Proof Bar ─── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-white">25+</div>
            <div className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-dim mt-2">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white">73</div>
            <div className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-dim mt-2">AI Agents</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white">91%</div>
            <div className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-dim mt-2">Gross Margins</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white">4</div>
            <div className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-dim mt-2">Active Clients</div>
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div className="max-w-5xl mx-auto px-6">
        <GradientDivider />
      </div>

      {/* ─── Bottom CTA ─── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            One employee costs $60K a year. This costs less. And <span className="text-brand-lightblue">never sleeps.</span>
          </h2>
          <p className="text-base text-brand-gray leading-relaxed max-w-2xl mx-auto mb-12">
            50 founding members get locked-in pricing at $1,500/mo before it goes to $2,500. Built for your industry. Gets smarter every day. Ready when you are.
          </p>

          {/* CTA Box */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-60" />
            <div className="bg-[rgba(11,11,11,0.7)] backdrop-blur-[20px] border border-brand-border rounded-2xl p-8">
              <SignupForm id="bottom" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 px-6 border-t border-brand-border">
        <p className="text-center text-xs text-brand-dim">
          2026 Taptico Holdings, LLC | taptico.ai | info@taptico.com
        </p>
      </footer>
    </div>
  );
}
