import en from './en.json';
import zh from './zh.json';

export type Lang = 'zh' | 'en';
const dict = { en, zh } as const;

/** t('zh', 'nav.home') -> '首頁'. Falls back to the key if missing. */
export function t(lang: Lang, key: string): string {
  const value = key.split('.').reduce<any>((obj, k) => obj?.[k], dict[lang]);
  return typeof value === 'string' ? value : key;
}

/** Same page in the other language: /zh/about/ <-> /en/about/ */
export function switchLangPath(pathname: string, lang: Lang): string {
  const other: Lang = lang === 'zh' ? 'en' : 'zh';
  return /^\/(zh|en)(\/|$)/.test(pathname)
    ? pathname.replace(/^\/(zh|en)/, `/${other}`)
    : `/${other}/`;
}

export const pages = ['home', 'about', 'service', 'impact', 'news'] as const;
export const pagePath = (lang: Lang, page: string) =>
  page === 'home' ? `/${lang}/` : `/${lang}/${page}/`;