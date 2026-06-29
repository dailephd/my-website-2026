import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import type { OpenGraphImage } from '@/types/seo';
import { createAbsoluteUrl } from './site-url';

const DEFAULT_OG_IMAGE = '/images/og/default-og.png';
const REQUIRED_WIDTH = 1200;
const REQUIRED_HEIGHT = 630;

function getPngDimensions(filePath: string): { width: number; height: number } | undefined {
  const bytes = readFileSync(filePath);
  if (bytes.length < 24 || bytes.subarray(1, 4).toString('ascii') !== 'PNG') return undefined;
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

export function resolveOpenGraphImage(
  requestedPath: string | undefined,
  alt: string,
): OpenGraphImage | undefined {
  for (const candidate of [requestedPath, DEFAULT_OG_IMAGE]) {
    if (!candidate?.startsWith('/images/og/')) continue;
    const filePath = path.join(process.cwd(), 'public', ...candidate.split('/').filter(Boolean));
    if (!existsSync(filePath)) continue;
    const dimensions = getPngDimensions(filePath);
    if (!dimensions || dimensions.width !== REQUIRED_WIDTH || dimensions.height !== REQUIRED_HEIGHT) continue;
    return { path: candidate, url: createAbsoluteUrl(candidate), ...dimensions, alt };
  }
  return undefined;
}

export function buildOpenGraphImages(requestedPath: string | undefined, alt: string): OpenGraphImage[] {
  const image = resolveOpenGraphImage(requestedPath, alt);
  return image ? [image] : [];
}

export const getOpenGraphImage = resolveOpenGraphImage;
