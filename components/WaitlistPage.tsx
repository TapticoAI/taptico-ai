'use client';
import { useState } from 'react';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');
    @keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,-40px) scale(1.1)}66%{transform:translate(-30px,30px) scale(0.9)}}
    @keyframes orb2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-80px,50px) scale(0.95)}66%{transform:translate(40px,-60px) scale(1.05)}}
    @keyframes orb3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(50px,70px) scale(1.08)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
    @keyframes scan{0%{top:-2px}100%{top:100%}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
    @keyframes logoIn{from{opacity:0;letter-spacing:0.5em}to{opacity:1;letter-spacing:-0.5px}}
    @keyframes successPop{0%{opacity:0;transform:scale(0.88) translateY(16px)}60%{transform:scale(1.03) translateY(-2px)}100%{opacity:1;transform:scale(1) translateY(0)}}
    @keyframes checkDraw{from{stroke-dashoffset:60}to{stroke-dashoffset:0}}
    *{box-sizing:border-box;margin:0;padding:0}
    .lc{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;font-family:'Inter',-apple-system,sans-serif;position:relative;overflow:hidden;background:#030314}
    .bg{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 20%,rgba(13,13,74,0.95) 0%,transparent 55%),radial-gradient(ellipse at 70% 80%,rgba(10,10,58,0.9) 0%,transparent 55%),#030314;z-index:0}
    .orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:1}
    .o1{width:500px;height:500px;background:radial-gradient(circle,rgba(44,62,140,0.28) 0%,transparent 70%);top:-100px;left:-100px;animation:orb1 18s ease-in-out infinite}
    .o2{width:600px;height:600px;background:radial-gradient(circle,rgba(26,26,110,0.22) 0%,transparent 70%);bottom:-150px;right:-150px;animation:orb2 22s ease-in-out infinite}
    .o3{width:320px;height:320px;background:radial-gradient(circle,rgba(123,140,222,0.12) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);animation:orb3 14s ease-in-out infinite}
    .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(123,140,222,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(123,140,222,0.04) 1px,transparent 1px);background-size:60px 60px;z-index:2;pointer-events:none}
    .scanline{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(123,140,222,0.07),transparent);z-index:4;animation:scan 8s linear infinite;pointer-events:none}
    .wrap{position:relative;z-index:10;width:100%;max-width:480px;animation:fadeUp 0.8s ease-out forwards}
    .card{background:rgba(255,255,255,0.03);border:1px solid rgba(123,140,222,0.14);border-radius:24px;padding:52px 44px;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);position:relative;overflow:hidden}
    .card::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(123,140,222,0.55),transparent);pointer-events:none}
    .c{position:absolute;width:18px;height:18px;opacity:0.45}
    .c-tl{top:18px;left:18px;border-top:1.5px solid rgba(123,140,222,0.8);border-left:1.5px solid rgba(123,140,222,0.8);border-radius:2px 0 0 0}
    .c-tr{top:18px;right:18px;border-top:1.5px solid rgba(123,140,222,0.8);border-right:1.5px solid rgba(123,140,222,0.8);border-radius:0 2px 0 0}
    .c-bl{bottom:18px;left:18px;border-bottom:1.5px solid rgba(123,140,222,0.8);border-left:1.5px solid rgba(123,140,222,0.8);border-radius:0 0 0 2px}
    .c-br{bottom:18px;right:18px;border-bottom:1.5px solid rgba(123,140,222,0.8);border-right:1.5px solid rgba(123,140,222,0.8);border-radius:0 0 2px 0}
    .badge{display:inline-flex;align-items:center;gap:7px;background:rgba(44,62,140,0.22);border:1px solid rgba(123,140,222,0.28);border-radius:20px;padding:6px 14px;margin-bottom:28px}
    .badge-dot{width:6px;height:6px;border-radius:50%;background:#7b8cde;animation:blink 2s ease-in-out infinite;box-shadow:0 0 8px rgba(123,140,222,0.7)}
    .badge-txt{font-size:10px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:rgba(168,180,232,0.8)}
    .wm{text-align:center;margin-bottom:24px}
    .logo{font-size:38px;font-weight:900;color:#fff;letter-spacing:-0.5px;line-height:1;animation:logoIn 1s ease-out 0.2s both}
    .logo-dot{color:#7b8cde}
    .logo-sub{font-size:10px;font-weight:600;letter-spacing:0.38em;text-transform:uppercase;color:rgba(123,140,222,0.55);margin-top:7px}
    .div{width:36px;height:1px;background:linear-gradient(90deg,transparent,rgba(123,140,222,0.45),transparent);margin:22px auto}
    .headline{font-size:28px;font-weight:900;color:#fff;letter-spacing:-0.5px;line-height:1.15;margin-bottom:12px;text-align:center}
    .headline span{background:linear-gradient(135deg,#7b8cde,#a8b4e8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .subline{font-size:14px;font-weight:400;color:rgba(168,180,232,0.6);text-align:center;line-height:1.6;margin-bottom:10px}
    .spots{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:32px}
    .spots-dot{width:7px;height:7px;border-radius:50%;background:#f39c12;animation:blink 1.5s ease-in-out infinite;box-shadow:0 0 8px rgba(243,156,18,0.65);flex-shrink:0}
    .spots-txt{font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(243,156,18,0.85)}
    .lbl{display:block;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:rgba(168,180,232,0.55);margin-bottom:10px}
    .lbl-opt{font-size:9px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:rgba(168,180,232,0.35);margin-left:6px}
    .iw{position:relative;margin-bottom:14px}
    .inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(123,140,222,0.22);border-radius:12px;padding:16px 18px;color:#fff;font-size:15px;font-family:'Inter',sans-serif;outline:none;transition:all 0.25s ease}
    .inp::placeholder{color:rgba(255,255,255,0.18);font-size:13px}
    .inp:focus{border-color:rgba(44,62,140,0.95);background:rgba(255,255,255,0.06);box-shadow:0 0 0 1px rgba(44,62,140,0.5),0 0 22px rgba(44,62,140,0.32),0 0 44px rgba(44,62,140,0.14),inset 0 1px 0 rgba(255,255,255,0.04)}
    .promo-hint{font-size:11px;color:rgba(123,140,222,0.5);text-align:center;margin-bottom:22px;margin-top:-6px}
    .promo-hint strong{color:rgba(123,140,222,0.8);font-weight:600}
    .emsg{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:500;color:rgba(231,76,60,0.9);margin-bottom:14px;padding:10px 14px;background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.18);border-radius:8px;animation:fadeUp 0.3s ease-out}
    .btn{width:100%;background:linear-gradient(135deg,#1a1a6e 0%,#2c3e8c 50%,#3d52a0 100%);border:1px solid rgba(123,140,222,0.38);border-radius:12px;padding:17px;color:#fff;font-size:12px;font-weight:700;font-family:'Inter',sans-serif;letter-spacing:0.18em;text-transform:uppercase;cursor:pointer;transition:all 0.25s ease;position:relative;overflow:hidden}
    .btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(123,140,222,0.18),transparent);opacity:0;transition:opacity 0.25s ease}
    .btn:hover:not(:disabled){transform:translateY(-2px) scale(1.01);border-color:rgba(123,140,222,0.65);box-shadow:0 8px 28px rgba(44,62,140,0.52),0 0 42px rgba(44,62,140,0.24),inset 0 1px 0 rgba(255,255,255,0.08)}
    .btn:hover:not(:disabled)::before{opacity:1}
    .btn:active:not(:disabled){transform:translateY(0) scale(0.99)}
    .btn:disabled{opacity:0.38;cursor:not-allowed}
    .success{text-align:center;animation:successPop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards}
    .check-wrap{width:72px;height:72px;margin:0 auto 24px;background:rgba(44,62,140,0.2);border:1px solid rgba(123,140,222,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center}
    .check-svg{width:36px;height:36px}
    .check-path{stroke:#7b8cde;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;fill:none;stroke-dasharray:60;stroke-dashoffset:60;animation:checkDraw 0.5s ease-out 0.2s forwards}
    .s-title{font-size:20px;font-weight:800;color:#fff;margin-bottom:10px;letter-spacing:-0.3px}
    .s-msg{font-size:14px;color:rgba(168,180,232,0.65);line-height:1.6}
    .s-promo{font-size:13px;color:rgba(123,140,222,0.9);margin-top:12px;padding:10px 16px;background:rgba(44,62,140,0.18);border:1px solid rgba(123,140,222,0.25);border-radius:10px}
    .stats{display:flex;justify-content:center;margin-top:34px;padding-top:26px;border-top:1px solid rgba(255,255,255,0.05)}
    .stat{text-align:center;flex:1;position:relative}
    .stat+.stat::before{content:'';position:absolute;left:0;top:20%;height:60%;width:1px;background:rgba(255,255,255,0.06)}
    .sn{display:block;font-size:18px;font-weight:800;color:rgba(255,255,255,0.88);line-height:1}
    .sl{display:block;font-size:9px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-top:5px}
    .foot{text-align:center;margin-top:22px;font-size:10px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.13)}
    @media(max-width:520px){.card{padding:38px 26px}.logo{font-size:30px}.headline{font-size:22px}}
  `;

  return (
    <>
      <style>{css}</style>
      <div className="lc">
        <div className="bg" />
        <div className="orb o1" /><div className="orb o2" /><div className="orb o3" />
        <div className="grid" />
        <div className="scanline" />
        <div className="wrap">
          <div className="card">
            <div className="c c-tl" /><div className="c c-tr" />
            <div className="c c-bl" /><div className="c c-br" />

            <div style={{ textAlign: 'center' }}>
              <div className="badge">
                <div className="badge-dot" />
                <div className="badge-txt">Beta Pilot Program</div>
              </div>
            </div>

            <div className="wm">
              <img src="/taptico-logo-white.png" alt="TapticoAI" style={{height:'54px',maxWidth:'320px',display:'block',animation:'logoIn 1s ease-out 0.2s both'}} />
            </div>

            <div className="div" />

            <div className="headline">The <span>AI Workforce</span><br />Is Here</div>
            <div className="subline">
              One command. Sixty agents. Zero waiting.<br />
              Deploy your AI workforce in minutes.
            </div>

            <div className="spots">
              <div className="spots-dot" />
              <div className="spots-txt">47 spots remaining</div>
            </div>

            {status === 'success' ? (
              <div className="success">
                <div className="check-wrap">
                  <svg className="check-svg" viewBox="0 0 36 36">
                    <path className="check-path" d="M8 18 L15 25 L28 11" />
                  </svg>
                </div>
                <div className="s-title">You&apos;re on the list.</div>
                <div className="s-msg">We&apos;ll be in touch when your seat is ready.</div>
                {promoSuccess && (
                  <div className="s-promo">🎉 Your first 14 days are on us.</div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label className="lbl" htmlFor="email-field">Email Address</label>
                <div className="iw">
                  <input
                    id="email-field"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                    placeholder="you@company.com"
                    required
                    className="inp"
                  />
                </div>

                <label className="lbl" htmlFor="promo-field">
                  Promo Code <span className="lbl-opt">optional</span>
                </label>
                <div className="iw">
                  <input
                    id="promo-field"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="inp"
                  />
                </div>

                <div className="promo-hint">
                  Use code <strong>NicksFirst50</strong> for your first 14 days free — limited to 50 spots
                </div>

                {status === 'error' && (
                  <div className="emsg">
                    <span>⊘</span>
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  className="btn"
                >
                  {status === 'loading' ? '↻  Securing Your Spot...' : '⚡  Reserve Your Spot'}
                </button>
              </form>
            )}

            <div className="stats">
              {([
                ['73', 'Agents Built'],
                ['5', 'Charter Clients'],
                ['$375K', 'ARR'],
              ] as [string, string][]).map(([n, l]) => (
                <div key={l} className="stat">
                  <span className="sn">{n}</span>
                  <span className="sl">{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="foot">
            © 2026 Taptico &nbsp;·&nbsp; Built by TapticoOS
          </div>
        </div>
      </div>
    </>
  );
}
