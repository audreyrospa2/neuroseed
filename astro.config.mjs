import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://neuroseed.ecorazon.co',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: { prefixDefaultLocale: true },
  },
});