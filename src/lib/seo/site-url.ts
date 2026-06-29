const DEVELOPMENT_SITE_URL = 'http://localhost:3000';

export function normalizeSiteUrl(url: string): string {
  const parsed = new URL(url.trim());
  parsed.pathname = parsed.pathname.replace(/\/+/g, '/').replace(/\/$/, '');
  parsed.search = '';
  parsed.hash = '';
  return parsed.toString().replace(/\/$/, '');
}

export function normalizePath(path = '/'): string {
  const normalized = `/${path}`.replace(/\/+/g, '/');
  return normalized.length > 1 ? normalized.replace(/\/$/, '') : normalized;
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  try {
    return normalizeSiteUrl(configured || DEVELOPMENT_SITE_URL);
  } catch {
    return DEVELOPMENT_SITE_URL;
  }
}

export function createAbsoluteUrl(path = '/'): string {
  return new URL(normalizePath(path), `${getSiteUrl()}/`).toString();
}
