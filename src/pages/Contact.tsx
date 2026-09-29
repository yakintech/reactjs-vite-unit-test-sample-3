import { useState, type FormEvent } from 'react'
import { bgPhoto } from '../images'
import { useLanguage } from '../i18n/LanguageContext'

export default function Contact() {
  // Dil değişince mesaj da çevrilsin diye metni değil, ismi saklıyoruz
  const [sentBy, setSentBy] = useState<string | null>(null)
  const { t } = useLanguage()

  const info = [
    { icon: '📍', title: t.contact.address, text: t.contact.addressText },
    { icon: '📞', title: t.contact.phone, text: '0212 000 00 00' },
    { icon: '✉️', title: t.contact.email, text: 'info@lezzetduragi.com' },
    { icon: '🕒', title: t.contact.hours, text: t.contact.hoursText },
  ]

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setSentBy(String(new FormData(form).get('name')))
    form.reset()
  }

  return (
    <>
      <section className="page-hero" style={bgPhoto('1559339352-11d035aa65de')}>
        <div className="container">
          <h1>{t.contact.title}</h1>
          <p>{t.contact.subtitle}</p>
        </div>
      </section>

      <section className="section container contact">
        <div className="contact-info">
          <h2>{t.contact.infoTitle}</h2>
          <ul>
            {info.map((i) => (
              <li key={i.icon}>
                <span>{i.icon}</span>
                <div>
                  <strong>{i.title}</strong>
                  {i.text}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              {t.contact.nameLabel} <input name="name" placeholder={t.contact.namePlaceholder} required />
            </label>
            <label>
              {t.contact.emailLabel}{' '}
              <input name="email" type="email" placeholder={t.contact.emailPlaceholder} required />
            </label>
          </div>
          <label>
            {t.contact.messageLabel}{' '}
            <textarea name="message" rows={6} placeholder={t.contact.messagePlaceholder} required />
          </label>
          <button type="submit" className="btn">{t.contact.submit}</button>
          {sentBy !== null && <p className="success">{t.contact.success(sentBy)}</p>}
        </form>
      </section>
    </>
  )
}
