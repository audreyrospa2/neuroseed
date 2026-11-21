import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://www.neuroseed.org/');
  const body = origin.hostname === 'www.neuroseed.org'
    ? ['User-agent: Googlebot', 'User-agent: bingbot', 'User-agent: OAI-SearchBot', 'User-agent: Claude-SearchBot', 'User-agent: PerplexityBot',
       'Allow: /', 'Disallow: /admin', '', 'User-agent: *', 'Disallow: /admin', '', `Sitemap: ${new URL('/sitemap.xml', origin).href}`, ''].join('\n')
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
