import { Resend } from 'resend';

export interface ContactEmailPayload {
  senderEmail: string;
  title: string;
  message: string;
}

export type SendContactEmailResult =
  | { ok: true }
  | { ok: false; error: string; reason: 'missing-api-key' | 'missing-from-email' | 'provider-error' };

function getConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'dailephd@gmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const fromName = process.env.CONTACT_FROM_NAME ?? 'dailephd LLC';
  const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX ?? '[dailephd LLC contact]';

  return { apiKey, toEmail, fromEmail, fromName, subjectPrefix };
}

export async function sendContactEmail(
  payload: ContactEmailPayload,
): Promise<SendContactEmailResult> {
  const { apiKey, toEmail, fromEmail, fromName, subjectPrefix } = getConfig();

  if (!apiKey) {
    console.error('[contact-email] Cannot send: RESEND_API_KEY is not configured.');
    return {
      ok: false,
      error: 'Email service is not configured (missing RESEND_API_KEY).',
      reason: 'missing-api-key',
    };
  }
  if (!fromEmail) {
    console.error('[contact-email] Cannot send: CONTACT_FROM_EMAIL is not configured.');
    return {
      ok: false,
      error: 'Email service is not configured (missing CONTACT_FROM_EMAIL).',
      reason: 'missing-from-email',
    };
  }

  const resend = new Resend(apiKey);
  const subject = `${subjectPrefix} ${payload.title}`;
  const timestamp = new Date().toISOString();

  const textBody = [
    `From: ${payload.senderEmail}`,
    `Subject: ${payload.title}`,
    `Sent: ${timestamp}`,
    `Source: dailephd.com contact form`,
    '',
    payload.message,
  ].join('\n');

  const htmlBody = `
<p><strong>From:</strong> ${escapeHtml(payload.senderEmail)}</p>
<p><strong>Subject:</strong> ${escapeHtml(payload.title)}</p>
<p><strong>Sent:</strong> ${escapeHtml(timestamp)}</p>
<p><strong>Source:</strong> dailephd.com contact form</p>
<hr />
<p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>
`.trim();

  try {
    const result = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [toEmail],
      replyTo: payload.senderEmail,
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (result.error) {
      console.error('[contact-email] Resend returned an error:', result.error);
      return { ok: false, error: 'Email provider returned an error.', reason: 'provider-error' };
    }
    return { ok: true };
  } catch (err) {
    console.error('[contact-email] Unexpected error sending email:', err);
    return { ok: false, error: 'Failed to send email.', reason: 'provider-error' };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
