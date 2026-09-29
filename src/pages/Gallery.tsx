import Carousel, { type Slide } from '../components/Carousel'
import { bgPhoto } from '../images'
import { useLanguage } from '../i18n/LanguageContext'

const foods = [
  { key: 'kebab', photo: '1603360946369-dc9bb6258143' },
  { key: 'grill', photo: '1599487488170-d11ec9c172f0' },
  { key: 'wrap', photo: '1633321702518-7feccafb94d5' },
  { key: 'chicken', photo: '1561651823-34feb02250e4' },
  { key: 'steak', photo: '1432139509613-5c4255815697' },
  { key: 'kofte', photo: '1529042410759-befb1204b468' },
  { key: 'salad', photo: '1540189549336-e6e99c3679fe' },
  { key: 'dessert', photo: '1488477181946-6428a0291777' },
] as const

const venue = [
  { key: 'hall', photo: '1517248135467-4c7edcad34c4' },
  { key: 'terrace', photo: '1559339352-11d035aa65de' },
  { key: 'green', photo: '1537047902294-62a40c20a6ae' },
  { key: 'bar', photo: '1514933651103-005eec06c04b' },
  { key: 'private', photo: '1550966871-3ed3cdb5ed0c' },
  { key: 'kitchen', photo: '1577219491135-ce391730fb2c' },
  { key: 'guests', photo: '1592861956120-e524fc739696' },
] as const

export default function Gallery() {
  const { t } = useLanguage()

  const foodSlides: Slide[] = foods.map((f) => ({ photo: f.photo, ...t.gallery.foods[f.key] }))
  const venueSlides: Slide[] = venue.map((v) => ({ photo: v.photo, ...t.gallery.venue[v.key] }))

  return (
    <>
      <section className="page-hero" style={bgPhoto('1414235077428-338989a2e8c0')}>
        <div className="container">
          <h1>{t.gallery.title}</h1>
          <p>{t.gallery.subtitle}</p>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <span className="eyebrow">{t.gallery.foodEyebrow}</span>
          <h2>{t.gallery.foodTitle}</h2>
        </div>
        <Carousel label={t.gallery.foodLabel} slides={foodSlides} />
      </section>

      <section className="section container">
        <div className="section-head">
          <span className="eyebrow">{t.gallery.venueEyebrow}</span>
          <h2>{t.gallery.venueTitle}</h2>
        </div>
        <Carousel label={t.gallery.venueLabel} slides={venueSlides} />
      </section>
    </>
  )
}
