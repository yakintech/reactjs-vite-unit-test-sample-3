import { useLanguage, type Language } from '../i18n/LanguageContext'

const options: { code: Language; label: string; name: string }[] = [
  { code: 'tr', label: 'TR', name: 'Türkçe' },
  { code: 'en', label: 'EN', name: 'English' },
]

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className="lang-switch" role="group" aria-label={t.header.language}>
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          className={lang === o.code ? 'active' : undefined}
          aria-label={o.name}
          aria-pressed={lang === o.code}
          onClick={() => setLang(o.code)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
