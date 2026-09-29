import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../components/Header'
import Home from '../pages/Home'
import { renderWithProviders } from '../test-utils'

// Dil seçici header'da; değişikliğin sayfaya yansıdığını görmek için Home ile birlikte render ediyoruz
const renderPage = () =>
    renderWithProviders(
        <>
            <Header />
            <Home />
        </>
    )

describe('Language switching', () => {
    it('starts in Turkish by default', () => {
        renderPage()
        expect(screen.getByRole('button', { name: 'Türkçe' })).toHaveAttribute('aria-pressed', 'true')
        expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'false')
        expect(screen.getByRole('link', { name: 'Hakkımızda' })).toBeInTheDocument()
        expect(document.documentElement.lang).toBe('tr')
    })

    it('switches the whole page to English', async () => {
        renderPage()
        await userEvent.click(screen.getByRole('button', { name: 'English' }))

        expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true')
        expect(screen.getByRole('link', { name: 'About Us' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Real flavor\s*at your table/)
        expect(screen.queryByRole('link', { name: 'Hakkımızda' })).not.toBeInTheDocument()
    })

    it('switches back to Turkish', async () => {
        renderPage()
        await userEvent.click(screen.getByRole('button', { name: 'English' }))
        await userEvent.click(screen.getByRole('button', { name: 'Türkçe' }))

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Sofranıza gelen\s*gerçek lezzet/)
    })

    it('saves the choice and updates the html lang attribute', async () => {
        renderPage()
        await userEvent.click(screen.getByRole('button', { name: 'English' }))

        expect(localStorage.getItem('lang')).toBe('en')
        expect(document.documentElement.lang).toBe('en')
    })

    it('restores the saved language on the next visit', () => {
        localStorage.setItem('lang', 'en')
        renderPage()
        expect(screen.getByRole('link', { name: 'About Us' })).toBeInTheDocument()
    })
})
