import { useEffect, useState } from 'react'
import axios from 'axios'
import { getMealsByArea, type Meal } from '../api/meals'
import { bgPhoto } from '../images'
import { useLanguage } from '../i18n/LanguageContext'

type Status = 'loading' | 'success' | 'error'

const SKELETON_COUNT = 8

export default function Menu() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [query, setQuery] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    // Sayfadan çıkılırsa veya tekrar denenirse yarım kalan isteği iptal et
    const controller = new AbortController()
    setStatus('loading')

    getMealsByArea('Turkish', controller.signal)
      .then((data) => {
        setMeals(data)
        setStatus('success')
      })
      .catch((error) => {
        if (axios.isCancel(error)) return
        setStatus('error')
      })

    return () => controller.abort()
  }, [reloadKey])

  const filtered = meals.filter((m) => m.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))

  return (
    <>
      <section className="page-hero" style={bgPhoto('1603360946369-dc9bb6258143')}>
        <div className="container">
          <h1>{t.menu.title}</h1>
          <p>{t.menu.subtitle}</p>
        </div>
      </section>

      <section className="section container">
        <div className="menu-toolbar">
          <input
            type="search"
            className="menu-search"
            placeholder={t.menu.searchPlaceholder}
            aria-label={t.menu.searchLabel}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={status !== 'success'}
          />
          {status === 'success' && <span className="menu-count">{t.menu.count(filtered.length)}</span>}
        </div>

        {status === 'loading' && (
          <div className="cards" aria-busy="true" aria-label={t.menu.loading}>
            {Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <div className="card skeleton" key={i}>
                <div className="card-img" />
                <div className="card-body">
                  <div className="skeleton-line" />
                  <div className="skeleton-line short" />
                </div>
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="menu-message" role="alert">
            <p>{t.menu.error}</p>
            <button className="btn" onClick={() => setReloadKey((k) => k + 1)}>
              {t.menu.retry}
            </button>
          </div>
        )}

        {status === 'success' && filtered.length === 0 && (
          <div className="menu-message">
            <p>{t.menu.empty}</p>
          </div>
        )}

        {status === 'success' && filtered.length > 0 && (
          <div className="cards">
            {filtered.map((m) => (
              <article className="card" key={m.id}>
                <div className="card-img">
                  <img src={`${m.thumbnail}/medium`} alt={m.name} loading="lazy" />
                </div>
                <div className="card-body">
                  <span className="tag">{t.menu.cuisine}</span>
                  <h3>{m.name}</h3>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="menu-source">
          {t.menu.source}{' '}
          <a href="https://www.themealdb.com" target="_blank" rel="noreferrer">
            TheMealDB
          </a>
        </p>
      </section>
    </>
  )
}
