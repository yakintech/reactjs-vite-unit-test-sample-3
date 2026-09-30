import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const classes = ['header', scrolled && 'scrolled', open && 'open'].filter(Boolean).join(' ')

  return (
    <header className={classes}>
      <div className="container header-inner">
        <Link to="/" className="logo">
          Lezzet<span>Durağı</span>
        </Link>
        <nav className="nav">
          <NavLink to="/" end>{t.header.home}</NavLink>
          <NavLink to="/hakkimizda">{t.header.about}</NavLink>
          <NavLink to="/menu">{t.header.menu}</NavLink>
          <NavLink to="/galeri">{t.header.gallery}</NavLink>
          <NavLink to="/iletisim">{t.header.contact}</NavLink>
          <Link to="/iletisim" className="btn btn-sm">{t.header.reserve}</Link>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher />
          <button
            className="menu-toggle"
            aria-label={t.header.openMenu}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}
