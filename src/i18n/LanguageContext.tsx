import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import tr, { type Translations } from './tr'
import en from './en'

export type Language = 'tr' | 'en'

const translations: Record<Language, Translations> = { tr, en }
const STORAGE_KEY = 'lang'

type LanguageContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations
}

// Provider olmadan render edilen bileşenler Türkçe görünür
const LanguageContext = createContext<LanguageContextValue>({
  lang: 'tr',
  setLang: () => {},
  t: tr,
})

const readStoredLang = (): Language | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'tr' || stored === 'en' ? stored : null
  } catch {
    return null
  }
}

type Props = {
  children: ReactNode
  initialLang?: Language
}

export function LanguageProvider({ children, initialLang }: Readonly<Props>) {
  const [lang, setLang] = useState<Language>(() => initialLang ?? readStoredLang() ?? 'tr')

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Depolama kapalıysa seçim sadece bu ziyarette geçerli olur
    }
  }, [lang])

  return <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)
