import { Link } from 'react-router-dom'
import { bgPhoto, img } from '../images'
import { useLanguage } from '../i18n/LanguageContext'
import WelcomeModal from '../components/WelcomeModal'

const menu = [
  { key: 'kebab', price: 320, photo: '1603360946369-dc9bb6258143' },
  { key: 'kofte', price: 260, photo: '1529042410759-befb1204b468' },
  { key: 'salad', price: 150, photo: '1540189549336-e6e99c3679fe' },
  { key: 'dessert', price: 120, photo: '1488477181946-6428a0291777' },
] as const

export default function Home() {
  const { t } = useLanguage()

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <WelcomeModal />

      <section className="hero" style={bgPhoto('1414235077428-338989a2e8c0')}>
        <div className="container hero-content">
          <span className="eyebrow">{t.home.eyebrow}</span>
          <h1>
            {t.home.titleLine1}
            <br />
            {t.home.titleLine2}
          </h1>
          <p>{t.home.intro}</p>
          <div className="hero-actions">
            <Link to="/iletisim" className="btn">{t.home.reserve}</Link>
            <button className="btn btn-ghost" onClick={scrollToMenu}>{t.home.seeMenu}</button>
          </div>
        </div>
      </section>

      <section className="section container" id="menu">
        <div className="section-head">
          <span className="eyebrow">{t.home.menuEyebrow}</span>
          <h2>{t.home.menuTitle}</h2>
        </div>
        <div className="cards">
          {menu.map((m) => {
            const item = t.home.menu[m.key]
            return (
              <article className="card" key={m.key}>
                <div className="card-img">
                  <img src={img(m.photo, 600)} alt={item.name} loading="lazy" />
                </div>
                <div className="card-body">
                  <div className="card-title">
                    <h3>{item.name}</h3>
                    <span className="price">{m.price} ₺</span>
                  </div>
                  <p>{item.desc}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section container split">
        <img className="split-img" src={img('1517248135467-4c7edcad34c4', 1000)} alt={t.home.venueAlt} loading="lazy" />
        <div>
          <span className="eyebrow">{t.home.venueEyebrow}</span>
          <h2>{t.home.venueTitle}</h2>
          <p>{t.home.venueText}</p>
          <Link to="/hakkimizda" className="link">{t.home.venueLink}</Link>
        </div>
      </section>

      <section className="cta" style={bgPhoto('1600891964599-f61ba0e24092')}>
        <div className="container">
          <h2>{t.home.ctaTitle}</h2>
          <p>{t.home.ctaText}</p>
          <Link to="/iletisim" className="btn">{t.home.reserve}</Link>
        </div>
      </section>
    </>
  )
}
