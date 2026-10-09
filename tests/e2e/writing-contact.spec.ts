import { expect, test } from '@playwright/test';

test('publications page renders real publication records', async ({ page }) => {
  await page.goto('/publications');
  await expect(page.getByRole('heading', { level: 1, name: 'Publications' })).toBeVisible();
  const title = 'Efflux pumps control intracellular drug-target kinetics by limiting rebinding in bacteria';
  const publication = page.locator('article').filter({
    has: page.getByRole('heading', { level: 3, name: title, exact: true }),
  });
  await expect(publication).toHaveCount(1);
  await expect(publication.getByRole('heading', { level: 3, name: title, exact: true })).toBeVisible();
  await expect(publication.getByText(/Science Advances 12 \(5\) eaea7983 \(2026\)/)).toBeVisible();
  await expect(publication.getByRole('link', { name: title, exact: true })).toHaveAttribute(
    'href',
    'https://doi.org/10.1126/sciadv.aea7983',
  );
  await expect(publication.getByRole('link', { name: 'doi:10.1126/sciadv.aea7983' })).toHaveAttribute(
    'href',
    'https://doi.org/10.1126/sciadv.aea7983',
  );
});

test('contact form exposes required fields, validation, and a safe mocked submission', async ({ page }) => {
  let submittedPayload: unknown;
  await page.route('**/api/contact', async (route) => {
    submittedPayload = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
  });
  await page.goto('/contact');
  await expect(page.getByRole('heading', { level: 1, name: 'Contact' })).toBeVisible();
  const form = page.getByRole('form', { name: 'Contact form' });
  await expect(form).toBeVisible();
  const email = form.getByRole('textbox', { name: 'Your email' });
  const subject = form.getByRole('textbox', { name: 'Message title' });
  const message = form.getByRole('textbox', { name: 'Message', exact: true });
  await expect(email).toHaveAttribute('required', '');
  await expect(subject).toHaveAttribute('required', '');
  await expect(message).toHaveAttribute('required', '');
  await expect(page.getByRole('link', { name: 'GitHub', exact: true })).toHaveAttribute(
    'href',
    'https://github.com/dailephd',
  );
  await expect(page.getByRole('link', { name: 'LinkedIn', exact: true })).toHaveAttribute(
    'href',
    'https://linkedin.com/in/dailephd',
  );

  await form.getByRole('button', { name: 'Submit' }).click();
  await expect(form.getByRole('alert')).toHaveText('All fields are required.');
  await email.fill('not-an-email');
  await subject.fill('Project inquiry');
  await message.fill('Please contact me about the project.');
  await form.getByRole('button', { name: 'Submit' }).click();
  await expect(form.getByRole('alert')).toHaveText('Please enter a valid email address.');

  await email.fill('reader@example.com');
  await form.getByRole('button', { name: 'Submit' }).click();
  await expect(form.getByRole('status')).toHaveText('Message sent. You will hear back at the email you provided.');
  expect(submittedPayload).toEqual({
    senderEmail: 'reader@example.com',
    title: 'Project inquiry',
    message: 'Please contact me about the project.',
  });
  await expect(email).toHaveValue('');
  await expect(subject).toHaveValue('');
  await expect(message).toHaveValue('');
});

test('contact form shows a mocked API error without losing the message', async ({ page }) => {
  await page.route('**/api/contact', async (route) => {
    await route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Service temporarily unavailable.' }),
    });
  });
  await page.goto('/contact');
  const form = page.getByRole('form', { name: 'Contact form' });
  await form.getByRole('textbox', { name: 'Your email' }).fill('reader@example.com');
  await form.getByRole('textbox', { name: 'Message title' }).fill('Project inquiry');
  const message = form.getByRole('textbox', { name: 'Message', exact: true });
  await message.fill('Please contact me about the project.');
  await form.getByRole('button', { name: 'Submit' }).click();

  await expect(form.getByRole('alert')).toHaveText('Service temporarily unavailable.');
  await expect(message).toHaveValue('Please contact me about the project.');
});

test('publications and contact remain mobile-safe in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('my-website-2026-theme', 'dark'));
  for (const route of ['/publications', '/contact']) {
    await page.goto(route);
    await expect(page.locator('html')).toHaveClass(/dark/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
