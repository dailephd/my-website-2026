import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/server/send-contact-email';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TITLE = 200;
const MAX_MESSAGE = 10000;
const MIN_MESSAGE = 10;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  // Honeypot: bots fill companyWebsite; real users leave it empty.
  if (raw.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  const senderEmail = typeof raw.senderEmail === 'string' ? raw.senderEmail.trim() : '';
  const title = typeof raw.title === 'string' ? raw.title.trim() : '';
  const message = typeof raw.message === 'string' ? raw.message.trim() : '';

  const validationErrors: string[] = [];

  if (!senderEmail) {
    validationErrors.push('Your email is required.');
  } else if (!EMAIL_RE.test(senderEmail)) {
    validationErrors.push('Your email must be a valid address.');
  }

  if (!title) {
    validationErrors.push('Message title is required.');
  } else if (title.length > MAX_TITLE) {
    validationErrors.push(`Message title must be ${MAX_TITLE} characters or fewer.`);
  }

  if (!message) {
    validationErrors.push('Message content is required.');
  } else if (message.length < MIN_MESSAGE) {
    validationErrors.push(`Message must be at least ${MIN_MESSAGE} characters.`);
  } else if (message.length > MAX_MESSAGE) {
    validationErrors.push(`Message must be ${MAX_MESSAGE} characters or fewer.`);
  }

  if (validationErrors.length > 0) {
    return NextResponse.json({ error: validationErrors[0] }, { status: 400 });
  }

  const result = await sendContactEmail({ senderEmail, title, message });

  if (!result.ok) {
    // Config errors (missing env vars) contain no secrets and are safe to surface so the
    // site owner notices a misconfigured deployment. Provider/network failures are only
    // detailed outside production to avoid leaking provider internals to visitors.
    const isConfigError = result.reason === 'missing-api-key' || result.reason === 'missing-from-email';
    const isDev = process.env.NODE_ENV !== 'production';
    const error =
      isConfigError || isDev
        ? result.error
        : 'Unable to send message at this time. Please try again later.';
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
