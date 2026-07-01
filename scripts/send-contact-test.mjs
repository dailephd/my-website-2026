/**
 * Manual contact form email delivery test.
 *
 * Sends a real test email ONLY when ALLOW_REAL_CONTACT_EMAIL_TEST=true.
 * Do not run this during normal tests, builds, or CI.
 *
 * Usage:
 *   ALLOW_REAL_CONTACT_EMAIL_TEST=true npm run test:contact-email
 *
 * Verify the result manually in Gmail (Primary, Spam, Promotions, Social, Trash).
 * This script cannot guarantee Gmail inbox placement — only the provider delivery.
 */

for (const envFile of ['.env.local', '.env']) {
  try {
    process.loadEnvFile(envFile);
  } catch {
    // File absent — fall through to process.env / next env file.
  }
}

const allow = process.env.ALLOW_REAL_CONTACT_EMAIL_TEST;

if (allow !== 'true') {
  console.log('Real email test skipped.');
  console.log('Set ALLOW_REAL_CONTACT_EMAIL_TEST=true to send a test email.');
  process.exit(0);
}

const apiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.CONTACT_TO_EMAIL ?? 'dailephd@gmail.com';
const fromEmail = process.env.CONTACT_FROM_EMAIL;
const fromName = process.env.CONTACT_FROM_NAME ?? 'dailephd LLC';
const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX ?? '[dailephd LLC contact]';

if (!apiKey) {
  console.error('ERROR: RESEND_API_KEY is not set in environment or .env.local');
  process.exit(1);
}
if (!fromEmail) {
  console.error('ERROR: CONTACT_FROM_EMAIL is not set in environment or .env.local');
  process.exit(1);
}

const { Resend } = await import('resend');
const resend = new Resend(apiKey);

const subject = `${subjectPrefix} Test message`;
const timestamp = new Date().toISOString();
const textBody = [
  'From: contact-test@script.local',
  `Subject: Test message`,
  `Sent: ${timestamp}`,
  'Source: dailephd.com contact form (manual test)',
  '',
  'This is a contact form delivery test from my-website-2026.',
  '',
  'Verify this message landed in Gmail Primary, Spam, Promotions, Social, or Trash.',
  'Gmail inbox placement cannot be guaranteed by application code.',
  'If the message is outside Primary, improve sender-domain authentication (SPF/DKIM/DMARC).',
].join('\n');

console.log(`Sending test email to: ${toEmail}`);
console.log(`From: ${fromName} <${fromEmail}>`);
console.log(`Subject: ${subject}`);

const result = await resend.emails.send({
  from: `${fromName} <${fromEmail}>`,
  to: [toEmail],
  replyTo: 'contact-test@script.local',
  subject,
  text: textBody,
});

if (result.error) {
  console.error('Resend returned an error:', JSON.stringify(result.error, null, 2));
  process.exit(1);
}

console.log('Resend accepted the message. ID:', result.data?.id ?? '(unknown)');
console.log('');
console.log('Next steps:');
console.log('  1. Check Gmail inbox (Primary, Spam, Promotions, Social, Trash).');
console.log('  2. If not in Primary, fix SPF/DKIM/DMARC for your sender domain.');
console.log('  3. See docs/WORKFLOWS.md for setup guidance.');
