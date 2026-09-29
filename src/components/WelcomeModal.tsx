import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { img } from '../images'
import { useLanguage } from '../i18n/LanguageContext'

const AUTO_CLOSE_MS = 5000
const EXIT_ANIMATION_MS = 300
const STORAGE_KEY = 'welcome-modal-seen'

const alreadySeen = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

const markSeen = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Depolama kapalıysa modal her girişte tekrar gösterilir
  }
}

export default function WelcomeModal() {
  const [open, setOpen] = useState(() => !alreadySeen())
  const [closing, setClosing] = useState(false)
  const { t } = useLanguage()

  const close = useCallback(() => setClosing(true), [])

  // Açıldığında: oturumda görüldü olarak işaretle, 5 sn sonra kapat, Esc ile kapat
  useEffect(() => {
    if (!open) return
    markSeen()
    const timer = setTimeout(close, AUTO_CLOSE_MS)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  // Çıkış animasyonu bitince DOM'dan kaldır
  useEffect(() => {
    if (!closing) return
    const timer = setTimeout(() => setOpen(false), EXIT_ANIMATION_MS)
    return () => clearTimeout(timer)
  }, [closing])

  if (!open) return null

  return (
    <div className={`modal-backdrop${closing ? ' closing' : ''}`} onClick={close}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        onClick={(e) => e.stopPropagation()}
        style={{ '--duration': `${AUTO_CLOSE_MS}ms` } as CSSProperties}
      >
        <button className="modal-close" aria-label={t.modal.close} onClick={close}>
          ×
        </button>
        <img className="modal-img" src={img('1504674900247-0877df9cc836', 700)} alt="" />
        <div className="modal-body">
          <span className="eyebrow">{t.modal.eyebrow}</span>
          <h2 id="welcome-title">{t.modal.title}</h2>
          <p>{t.modal.text}</p>
          <button className="btn" onClick={close}>
            {t.modal.cta}
          </button>
        </div>
        <div className="modal-progress" />
      </div>
    </div>
  )
}
