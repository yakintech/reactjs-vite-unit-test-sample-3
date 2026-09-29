import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <Link to="/" className="logo">
            Lezzet<span>Durağı</span>
          </Link>
          <p>{t.footer.tagline}</p>
        </div>
        <div>
          <h4>{t.footer.hoursTitle}</h4>
          <p>{t.footer.hours}</p>
        </div>
        <div>
          <h4>{t.footer.contactTitle}</h4>
          <p>
            0212 000 00 00
            <br />
            info@lezzetduragi.com
          </p>
        </div>
      </div>
      <p className="copy">© 2026 Lezzet Durağı. {t.footer.rights}</p>
    </footer>
  )
}
