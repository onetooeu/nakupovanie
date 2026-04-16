import type { Lang } from '../data/siteCopy';

export const defaultLang: Lang = 'sk';

export function normalizeLang(input: string | undefined): Lang {
  if (input === 'cz' || input === 'en' || input === 'sk') return input;
  return defaultLang;
}

export function localizePath(lang: Lang, path: string) {
  if (path === '/' || path === '') return `/${lang}`;
  return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
}

export function formatDate(value: string) {
  return value;
}
