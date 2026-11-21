import type { APIRoute } from 'astro';
import { languageTag, locales, sectionPath, sections } from '../i18n/seo';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://www.neuroseed.org/');
  const entries = sections.flatMap(section => {
    const url = (lang: 'zh' | 'en') => new URL(sectionPath(lang, section), origin).href;
    const alternate = locales.map(lang => `<xhtml:link rel="alternate" hreflang="${languageTag[lang]}" href="${url(lang)}"/>`).join('');
    return locales.map(lang => `<url><loc>${url(lang)}</loc>${alternate}<xhtml:link rel="alternate" hreflang="x-default" href="${url('zh')}"/></url>`);
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
