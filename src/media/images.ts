import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import mapped from './optimized.json';

const images: Record<string, { optimized: string; sourceSha256: string }> = mapped;
const verified = new Map<string, string>();

export function optimizedImage(source: string | null | undefined) {
  if (!source) return undefined;
  if (!Object.hasOwn(images, source)) return source;
  const cached = verified.get(source);
  if (cached) return cached;

  // A vendor can replace an image while keeping its filename.
  const original = join('public', source);
  const { optimized, sourceSha256 } = images[source];
  const matches = existsSync(original) && existsSync(join('public', optimized)) &&
    createHash('sha256').update(readFileSync(original)).digest('hex') === sourceSha256;
  const selected = matches ? optimized : source;
  verified.set(source, selected);
  return selected;
}
