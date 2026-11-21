import { defineConfig } from 'astro/config';
import { createHash } from 'node:crypto';
import { appendFile, readFile } from 'node:fs/promises';
import { loadEnv } from 'vite';

const { PUBLIC_BOOKING_ENDPOINT } = loadEnv('production', process.cwd(), 'PUBLIC_');
const bookingOrigin = PUBLIC_BOOKING_ENDPOINT ? new URL(PUBLIC_BOOKING_ENDPOINT).origin : '';
if (bookingOrigin && !bookingOrigin.startsWith('https://')) {
  throw new Error('PUBLIC_BOOKING_ENDPOINT must use HTTPS');
}

const publicPolicy = [
  "default-src 'self'", "base-uri 'none'", "frame-ancestors 'none'", "object-src 'none'",
  "script-src 'self'", "script-src-attr 'none'", "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https: data:", "font-src 'self'", "media-src 'self' https:",
  `connect-src 'self'${bookingOrigin ? ` ${bookingOrigin}` : ''}`, "form-action 'self'", "frame-src 'none'",
];

const pageSecurity = {
  name: 'neuroseed-page-security',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const rules = ['zh', 'en'].map((lang) =>
        `/${lang}/*\n  Content-Security-Policy: ${publicPolicy.join('; ')}`,
      );
      const admin = await readFile(new URL('admin/index.html', dir), 'utf8');
      const hashes = [...admin.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(([, code]) =>
        `'sha256-${createHash('sha256').update(code.replace(/\r\n?/g, '\n')).digest('base64')}'`,
      );
      const adminPolicy = [
        "default-src 'self'", "base-uri 'none'", "frame-ancestors 'none'", "object-src 'none'",
        `script-src 'self' ${hashes.join(' ')}`, "script-src-attr 'none'", "style-src 'self' 'unsafe-inline'",
        "img-src 'self' https: data: blob:",
        'connect-src https://api.github.com https://ecorazon-cms-oauth.audreyrospa2.workers.dev',
        "form-action 'none'", "frame-src 'none'",
      ];
      for (const path of ['/admin', '/admin/*']) {
        rules.push(`${path}\n  Cache-Control: no-store\n  X-Robots-Tag: noindex, nofollow, noarchive\n  Content-Security-Policy: ${adminPolicy.join('; ')}`);
      }
      await appendFile(new URL('_headers', dir), `\n${rules.join('\n\n')}\n`);
    },
  },
};

export default defineConfig({
  site: 'https://www.neuroseed.org',
  trailingSlash: 'always',
  integrations: [pageSecurity],
  vite: { build: { assetsInlineLimit: 0 } },
  build: { inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: { prefixDefaultLocale: true },
  },
});
