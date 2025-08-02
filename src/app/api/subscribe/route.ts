import { NextResponse } from 'next/server';
import { resend } from '../../../lib/resend';

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY!;

export async function POST(req: Request) {
  const { email, token } = await req.json();

  // Validate input
  if (!email || !email.includes('@') || !token) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  // Validate Turnstile token
  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: TURNSTILE_SECRET_KEY,
      response: token,
    }),
  });

  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 403 });
  }

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: 'Thanks for subscribing to AlgoFlow ',
      html: `<p>You're now subscribed to AlgoFlow updates!</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
  console.error('Subscription error:', error);
  return NextResponse.json({ error: 'Email failed to send' }, { status: 500 });
}

}
