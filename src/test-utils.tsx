import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider, type Language } from './i18n/LanguageContext'

type Options = {
  // Verilmezse dil localStorage'dan okunur, orada da yoksa Türkçe
  lang?: Language
  route?: string
}

// Sayfalar hem router'a (Link) hem de dil bilgisine ihtiyaç duyuyor
export const renderWithProviders = (ui: ReactElement, { lang, route = '/' }: Options = {}) =>
  render(
    <LanguageProvider initialLang={lang}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </LanguageProvider>
  )
