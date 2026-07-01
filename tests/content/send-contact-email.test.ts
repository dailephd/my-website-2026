import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const sendMock = vi.fn();

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}));

const ENV_KEYS = [
  'RESEND_API_KEY',
  'CONTACT_TO_EMAIL',
  'CONTACT_FROM_EMAIL',
  'CONTACT_FROM_NAME',
  'CONTACT_SUBJECT_PREFIX',
] as const;

async function loadSendContactEmail() {
  vi.resetModules();
  const mod = await import('@/lib/server/send-contact-email');
  return mod.sendContactEmail;
}

describe('sendContactEmail', () => {
  const payload = {
    senderEmail: 'visitor@example.com',
    title: 'Project inquiry',
    message: 'Hello, I would like to collaborate.',
  };

  beforeEach(() => {
    sendMock.mockReset();
    for (const key of ENV_KEYS) {
      vi.stubEnv(key, '');
      delete process.env[key];
    }
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('fails with reason missing-api-key when RESEND_API_KEY is unset', async () => {
    vi.stubEnv('CONTACT_FROM_EMAIL', 'contact@dailephd.com');
    const sendContactEmail = await loadSendContactEmail();

    const result = await sendContactEmail(payload);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe('missing-api-key');
    }
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('fails with reason missing-from-email when CONTACT_FROM_EMAIL is unset', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key');
    const sendContactEmail = await loadSendContactEmail();

    const result = await sendContactEmail(payload);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe('missing-from-email');
    }
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('sends with the verified from address, configured to address, and visitor reply-to', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key');
    vi.stubEnv('CONTACT_FROM_EMAIL', 'contact@dailephd.com');
    vi.stubEnv('CONTACT_TO_EMAIL', 'dailephd@gmail.com');
    vi.stubEnv('CONTACT_FROM_NAME', 'dailephd LLC');
    sendMock.mockResolvedValueOnce({ data: { id: 'abc123' }, error: null });
    const sendContactEmail = await loadSendContactEmail();

    const result = await sendContactEmail(payload);

    expect(result.ok).toBe(true);
    expect(sendMock).toHaveBeenCalledTimes(1);
    const call = sendMock.mock.calls[0][0];
    expect(call.from).toBe('dailephd LLC <contact@dailephd.com>');
    expect(call.to).toEqual(['dailephd@gmail.com']);
    expect(call.replyTo).toBe(payload.senderEmail);
  });

  it('defaults the destination address to dailephd@gmail.com when CONTACT_TO_EMAIL is unset', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key');
    vi.stubEnv('CONTACT_FROM_EMAIL', 'contact@dailephd.com');
    sendMock.mockResolvedValueOnce({ data: { id: 'abc123' }, error: null });
    const sendContactEmail = await loadSendContactEmail();

    await sendContactEmail(payload);

    expect(sendMock.mock.calls[0][0].to).toEqual(['dailephd@gmail.com']);
  });

  it('escapes HTML in the message body', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key');
    vi.stubEnv('CONTACT_FROM_EMAIL', 'contact@dailephd.com');
    sendMock.mockResolvedValueOnce({ data: { id: 'abc123' }, error: null });
    const sendContactEmail = await loadSendContactEmail();

    await sendContactEmail({ ...payload, message: '<script>alert(1)</script>' });

    expect(sendMock.mock.calls[0][0].html).not.toContain('<script>');
    expect(sendMock.mock.calls[0][0].html).toContain('&lt;script&gt;');
  });

  it('returns reason provider-error and does not throw when Resend returns an error', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key');
    vi.stubEnv('CONTACT_FROM_EMAIL', 'contact@dailephd.com');
    sendMock.mockResolvedValueOnce({ data: null, error: { message: 'domain not verified' } });
    const sendContactEmail = await loadSendContactEmail();

    const result = await sendContactEmail(payload);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe('provider-error');
    }
  });

  it('returns reason provider-error and does not throw when the Resend client rejects', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key');
    vi.stubEnv('CONTACT_FROM_EMAIL', 'contact@dailephd.com');
    sendMock.mockRejectedValueOnce(new Error('network timeout'));
    const sendContactEmail = await loadSendContactEmail();

    const result = await sendContactEmail(payload);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe('provider-error');
    }
  });
});
