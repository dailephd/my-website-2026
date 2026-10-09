'use client';

import { useRef, useState } from 'react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const FIELD_STYLES =
  'w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-primary)]';

const LABEL_STYLES = 'mb-1 block text-sm font-medium text-[var(--color-text-primary)]';

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const senderEmail = (data.get('senderEmail') as string).trim();
    const title = (data.get('title') as string).trim();
    const message = (data.get('message') as string).trim();

    if (!senderEmail || !title || !message) {
      setErrorMessage('All fields are required.');
      setStatus('error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderEmail, title, message }),
      });

      if (response.ok) {
        setStatus('success');
        formRef.current?.reset();
      } else {
        const json = await response.json().catch(() => ({}));
        setErrorMessage(
          typeof json.error === 'string' ? json.error : 'Failed to send message. Please try again.',
        );
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  function handleClear() {
    formRef.current?.reset();
    setStatus('idle');
    setErrorMessage('');
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-5"
    >
      {/* Honeypot — hidden from real users, bots fill it */}
      <div aria-hidden="true" className="hidden" tabIndex={-1}>
        <label htmlFor="companyWebsite">Company website (leave blank)</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          tabIndex={-1}
          type="text"
          autoComplete="off"
        />
      </div>

      <div>
        <label className={LABEL_STYLES} htmlFor="senderEmail">
          Your email <span aria-hidden="true">*</span>
        </label>
        <input
          className={FIELD_STYLES}
          id="senderEmail"
          name="senderEmail"
          required
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          disabled={status === 'sending'}
        />
      </div>

      <div>
        <label className={LABEL_STYLES} htmlFor="title">
          Message title <span aria-hidden="true">*</span>
        </label>
        <input
          className={FIELD_STYLES}
          id="title"
          name="title"
          required
          type="text"
          maxLength={200}
          placeholder="Brief subject for your message"
          disabled={status === 'sending'}
        />
      </div>

      <div>
        <label className={LABEL_STYLES} htmlFor="message">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          className={`${FIELD_STYLES} min-h-[180px] resize-y`}
          id="message"
          name="message"
          required
          maxLength={10000}
          placeholder="Describe the project, collaboration, or question"
          disabled={status === 'sending'}
          rows={7}
        />
      </div>

      {status === 'success' ? (
        <p
          role="status"
          aria-live="polite"
          className="rounded-[var(--radius-sm)] bg-[var(--color-surface-elevated)] px-4 py-3 text-sm text-[var(--color-text-primary)]"
        >
          Message sent. You will hear back at the email you provided.
        </p>
      ) : null}

      {status === 'error' && errorMessage ? (
        <p
          role="alert"
          aria-live="assertive"
          className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-text-secondary)]"
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-[var(--radius-sm)] bg-[var(--color-accent-primary-text)] px-5 py-2 text-sm font-semibold text-[var(--color-bg)] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Submit'}
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={status === 'sending'}
          className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-5 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear message
        </button>
      </div>
    </form>
  );
}
