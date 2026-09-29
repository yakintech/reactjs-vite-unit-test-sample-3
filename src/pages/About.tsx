import { bgPhoto, img } from '../images'
import { useLanguage } from '../i18n/LanguageContext'

const stats = [
  { key: 'years', value: '15+' },
  { key: 'dishes', value: '40+' },
  { key: 'capacity', value: '120' },
  { key: 'rating', value: '4.8★' },
] as const

const gallery = [
  { key: 'plate', photo: '1504674900247-0877df9cc836' },
  { key: 'bowl', photo: '1547592180-85f173990554' },
  { key: 'terrace', photo: '1559339352-11d035aa65de' },
  { key: 'table', photo: '1600891964599-f61ba0e24092' },
] as const

export default function About() {
  const { t } = useLanguage()

  return (
    <>
      <section className="page-hero" style={bgPhoto('1555396273-367ea4eb4db5')}>
        <div className="container">
          <h1>{t.about.title}</h1>
          <p>{t.about.subtitle}</p>
        </div>
      </section>

      <section className="section container split">
        <img className="split-img" src={img('1577219491135-ce391730fb2c', 1000)} alt={t.about.chefAlt} loading="lazy" />
        <div>
          <span className="eyebrow">{t.about.storyEyebrow}</span>
          <h2>{t.about.storyTitle}</h2>
          <p>{t.about.storyP1}</p>
          <p>{t.about.storyP2}</p>
        </div>
      </section>

      <section className="section container">
        <div className="stats">
          {stats.map((s) => (
            <div key={s.key}>
              <strong>{s.value}</strong>
              <span>{t.about.stats[s.key]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <span className="eyebrow">{t.about.galleryEyebrow}</span>
          <h2>{t.about.galleryTitle}</h2>
        </div>
        <div className="gallery">
          {gallery.map((g) => (
            <img key={g.key} src={img(g.photo, 800)} alt={t.about.galleryAlts[g.key]} loading="lazy" />
          ))}
        </div>
      </section>
    </>
  )
}
