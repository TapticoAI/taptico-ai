import { NextRequest, NextResponse } from 'next/server';

const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'Cvc5EmclHsFLw9BIuthx';
const PROMO_CODE = 'NicksFirst50';
const PROMO_LIMIT = 50;

async function getPromoUsageCount(): Promise<number> {
  try {
    const res = await fetch(
      `https://rest.gohighlevel.com/v1/contacts/?locationId=${GHL_LOCATION_ID}&tag=promo-nicks50&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!res.ok) return 0;
    const data = await res.json();
    return data?.meta?.total ?? data?.contacts?.length ?? 0;
  } catch {
    console.error('[waitlist] Failed to fetch promo usage count');
    return 0;
  }
}

async function createGHLContact(email: string, tags: string[]): Promise<boolean> {
  try {
    const res = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        locationId: GHL_LOCATION_ID,
        tags,
        source: 'taptico.ai waitlist',
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[waitlist] GHL contact creation failed:', err);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[waitlist] GHL request threw:', err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, promoCode } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid email required.' }, { status: 400 });
    }

    const trimmedPromo = (promoCode || '').trim();
    let tags = ['beta-waitlist'];
    let promoApplied = false;

    if (trimmedPromo) {
      if (trimmedPromo !== PROMO_CODE) {
        return NextResponse.json(
          { success: false, error: 'Invalid promo code.' },
          { status: 400 }
        );
      }

      const usageCount = await getPromoUsageCount();
      if (usageCount >= PROMO_LIMIT) {
        return NextResponse.json(
          { success: false, error: 'This promo code has reached its limit.' },
          { status: 400 }
        );
      }

      tags = ['beta-waitlist', 'promo-nicks50', '14-days-free'];
      promoApplied = true;
    }

    const ghlOk = await createGHLContact(email, tags);

    if (!ghlOk) {
      // GHL failed — log and still return success so UX doesn't break
      console.error('[waitlist] GHL failed — logged fallback:', email, tags);
    }

    return NextResponse.json({ success: true, promoApplied });
  } catch (err) {
    console.error('[waitlist] Unexpected error:', err);
    return NextResponse.json({ success: false, error: 'Server error. Please try again.' }, { status: 500 });
  }
}
