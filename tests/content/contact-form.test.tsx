// @vitest-environment jsdom
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ContactForm from '@/components/contact/ContactForm';
import { getProfileLinks } from '@/lib/content';

describe('ContactForm component', () => {
  it('renders the sender email field', () => {
    const markup = renderToStaticMarkup(<ContactForm />);
    expect(markup).toContain('Your email');
    expect(markup).toContain('name="senderEmail"');
    expect(markup).toContain('type="email"');
  });

  it('renders the message title field', () => {
    const markup = renderToStaticMarkup(<ContactForm />);
    expect(markup).toContain('Message title');
    expect(markup).toContain('name="title"');
  });

  it('renders the message textarea', () => {
    const markup = renderToStaticMarkup(<ContactForm />);
    expect(markup).toContain('Message');
    expect(markup).toContain('name="message"');
    expect(markup).toContain('<textarea');
  });

  it('renders the Submit button', () => {
    const markup = renderToStaticMarkup(<ContactForm />);
    expect(markup).toContain('Submit');
    expect(markup).toContain('type="submit"');
  });

  it('renders the Clear message button', () => {
    const markup = renderToStaticMarkup(<ContactForm />);
    expect(markup).toContain('Clear message');
    expect(markup).toContain('type="button"');
  });

  it('marks required fields', () => {
    const markup = renderToStaticMarkup(<ContactForm />);
    const requiredCount = (markup.match(/required/g) ?? []).length;
    expect(requiredCount).toBeGreaterThanOrEqual(3);
  });

  it('includes a honeypot field hidden from users', () => {
    const markup = renderToStaticMarkup(<ContactForm />);
    expect(markup).toContain('companyWebsite');
    expect(markup).toContain('aria-hidden="true"');
  });

  it('uses label elements for each field', () => {
    const markup = renderToStaticMarkup(<ContactForm />);
    expect(markup).toContain('<label');
    // renderToStaticMarkup emits HTML attributes: htmlFor becomes for=
    expect(markup).toContain('for="senderEmail"');
    expect(markup).toContain('for="title"');
    expect(markup).toContain('for="message"');
  });

  it('does not expose any API key', () => {
    const markup = renderToStaticMarkup(<ContactForm />);
    expect(markup).not.toContain('RESEND_API_KEY');
    expect(markup).not.toContain('re_');
  });
});

describe('ContactForm submit behavior', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  function fillValidForm() {
    fireEvent.change(screen.getByLabelText(/Your email/), {
      target: { value: 'visitor@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Message title/), {
      target: { value: 'Hello there' },
    });
    fireEvent.change(screen.getByLabelText(/^Message\s*\*/), {
      target: { value: 'This is a long enough test message.' },
    });
  }

  it('submit button calls /api/contact with the form fields', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    });

    render(<ContactForm />);
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /Submit/ }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const [url, init] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toBe('/api/contact');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({
      senderEmail: 'visitor@example.com',
      title: 'Hello there',
      message: 'This is a long enough test message.',
    });
  });

  it('shows a success message when the API returns ok true', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    });

    render(<ContactForm />);
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /Submit/ }));

    expect(await screen.findByRole('status')).toHaveTextContent('Message sent');
  });

  it('shows the API error message when the API returns failure', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Email service is not configured (missing RESEND_API_KEY).' }),
    });

    render(<ContactForm />);
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /Submit/ }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Email service is not configured (missing RESEND_API_KEY).',
    );
  });

  it('clear button resets all fields and status', () => {
    render(<ContactForm />);
    fillValidForm();

    fireEvent.click(screen.getByRole('button', { name: /Clear message/ }));

    expect(screen.getByLabelText(/Your email/)).toHaveValue('');
    expect(screen.getByLabelText(/Message title/)).toHaveValue('');
    expect(screen.getByLabelText(/^Message\s*\*/)).toHaveValue('');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('profile links (LinkedIn and GitHub)', () => {
  it('LinkedIn link is present and correct', () => {
    const links = getProfileLinks();
    const linkedin = links.find((l) => l.id === 'linkedin');
    expect(linkedin).toBeDefined();
    expect(linkedin?.href).toBe('https://linkedin.com/in/dailephd');
    expect(linkedin?.label).toBe('LinkedIn');
    expect(linkedin?.external).toBe(true);
  });

  it('GitHub link is present and correct', () => {
    const links = getProfileLinks();
    const github = links.find((l) => l.id === 'github');
    expect(github).toBeDefined();
    expect(github?.href).toBe('https://github.com/dailephd');
    expect(github?.label).toBe('GitHub');
    expect(github?.external).toBe(true);
  });

  it('no /work link remains in profile links', () => {
    const links = getProfileLinks();
    expect(links.every((l) => !l.href.includes('/work'))).toBe(true);
  });
});
