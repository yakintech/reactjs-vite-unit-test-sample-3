import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react'
import { img } from '../images'
import { useLanguage } from '../i18n/LanguageContext'

export type Slide = {
  photo: string
  title: string
  caption: string
}

type Props = {
  label: string
  slides: Slide[]
}

const SWIPE_THRESHOLD = 50

export default function Carousel({ label, slides }: Readonly<Props>) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const count = slides.length
  const { t } = useLanguage()

  // Son fotoğraftan sonra başa, ilkinden önce sona döner.
  // Fonksiyonlu güncelleme sayesinde art arda hızlı tıklamalar da doğru sayılır.
  const step = (delta: number) => setIndex((i) => (i + delta + count) % count)
  const goTo = (i: number) => setIndex(i)
  const prev = () => step(-1)
  const next = () => step(1)

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = e.changedTouches[0].clientX - touchStartX.current
    if (diff > SWIPE_THRESHOLD) prev()
    if (diff < -SWIPE_THRESHOLD) next()
    touchStartX.current = null
  }


  return (
    <section
      className="carousel"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="carousel-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((s, i) => (
            <figure
              className="carousel-slide"
              key={s.photo}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={i !== index}
            >
              <img src={img(s.photo, 1400)} alt={s.title} loading={i === 0 ? 'eager' : 'lazy'} />
              <figcaption>
                <h3>{s.title}</h3>
                <p>{s.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <button className="carousel-arrow prev" aria-label={t.carousel.prev} onClick={prev}>
          ‹
        </button>
        <button className="carousel-arrow next" aria-label={t.carousel.next} onClick={next}>
          ›
        </button>
        <span className="carousel-counter" aria-live="polite">
          {index + 1} / {count}
        </span>
      </div>

      <div className="carousel-thumbs">
        {slides.map((s, i) => (
          <button
            key={s.photo}
            className={`carousel-thumb${i === index ? ' active' : ''}`}
            aria-label={t.carousel.goTo(i + 1, s.title)}
            aria-current={i === index}
            onClick={() => goTo(i)}
          >
            <img src={img(s.photo, 200)} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </section>
  )
}
