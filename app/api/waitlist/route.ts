import { NextRequest, NextResponse } from 'next/server';

const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'Cvc5EmclHsFLw9BIuthx';

async function createGHLContact(email: string): Promise<boolean> {
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
                            tags: ['beta-waitlist'],
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
          const { email } = await req.json();

      if (!email || typeof email !== 'string' || !email.includes('@')) {
              return NextResponse.json({ success: false, error: 'Valid email required.' }, { status: 400 });
      }

      const ghlOk = await createGHLContact(email);
          if (!ghlOk) {
                  console.error('[waitlist] GHL failed — logged fallback:', email);
          }

      return NextResponse.json({ success: true });
    } catch (err) {
          console.error('[waitlist] Unexpected error:', err);
          return NextResponse.json({ success: false, error: 'Server error. Please try again.' }, { status: 500 });
    }
}
