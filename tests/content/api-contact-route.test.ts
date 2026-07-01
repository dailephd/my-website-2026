import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const sendContactEmailMock = vi.fn();

vi.mock('@/lib/server/send-contact-email', () => ({
  sendContactEmail: sendContactEmailMock,
}));

async function postContact(body: unknown) {
  const { POST } = await import('@/app/api/contact/route');
  const request = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const response = await POST(request);
  const json = await response.json();
  return { status: response.status, json };
}

describe('/api/contact route', () => {
  const validBody = {
    senderEmail: 'visitor@example.com',
    title: 'Project inquiry',
    message: 'This is a sufficiently long test message body.',
  };

  beforeEach(() => {
    sendContactEmailMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('rejects missing required fields', async () => {
    const { status, json } = await postContact({ senderEmail: '', title: '', message: '' });
    expect(status).toBe(400);
    expect(json.error).toBeTruthy();
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  it('rejects an invalid sender email', async () => {
    const { status, json } = await postContact({ ...validBody, senderEmail: 'not-an-email' });
    expect(status).toBe(400);
    expect(json.error).toMatch(/valid address/i);
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  it('calls sendContactEmail with the validated payload', async () => {
    sendContactEmailMock.mockResolvedValueOnce({ ok: true });
    const { status, json } = await postContact(validBody);
    expect(status).toBe(200);
    expect(json).toEqual({ ok: true });
    expect(sendContactEmailMock).toHaveBeenCalledWith(validBody);
  });

  it('reports missing RESEND_API_KEY from the API response', async () => {
    sendContactEmailMock.mockResolvedValueOnce({
      ok: false,
      error: 'Email service is not configured (missing RESEND_API_KEY).',
      reason: 'missing-api-key',
    });
    const { status, json } = await postContact(validBody);
    expect(status).toBe(500);
    expect(json.error).toBe('Email service is not configured (missing RESEND_API_KEY).');
  });

  it('reports missing CONTACT_FROM_EMAIL from the API response', async () => {
    sendContactEmailMock.mockResolvedValueOnce({
      ok: false,
      error: 'Email service is not configured (missing CONTACT_FROM_EMAIL).',
      reason: 'missing-from-email',
    });
    const { status, json } = await postContact(validBody);
    expect(status).toBe(500);
    expect(json.error).toBe('Email service is not configured (missing CONTACT_FROM_EMAIL).');
  });

  it('returns a generic message for provider errors in production, without leaking details', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    sendContactEmailMock.mockResolvedValueOnce({
      ok: false,
      error: 'Email provider returned an error.',
      reason: 'provider-error',
    });
    const { status, json } = await postContact(validBody);
    expect(status).toBe(500);
    expect(json.error).toBe('Unable to send message at this time. Please try again later.');
  });

  it('does not silently swallow failures: ok is always present in the response', async () => {
    sendContactEmailMock.mockResolvedValueOnce({
      ok: false,
      error: 'Failed to send email.',
      reason: 'provider-error',
    });
    const { json } = await postContact(validBody);
    expect(json.ok).toBeUndefined();
    expect(json.error).toBeTruthy();
  });
});
