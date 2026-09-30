import type { Language } from './LanguageContext'

const locales: Record<Language, string> = { tr: 'tr-TR', en: 'en-US' }

// '2026-06-01' → '1 Haziran 2026' / 'June 1, 2026'
export const formatDate = (isoDate: string, lang: Language) =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString(locales[lang], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
