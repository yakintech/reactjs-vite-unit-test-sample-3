
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Contact from './Contact'
import LanguageSwitcher from '../components/LanguageSwitcher'
import type { Language } from '../i18n/LanguageContext'
import { renderWithProviders } from '../test-utils'


const renderContact = (lang: Language = 'tr') => renderWithProviders(<Contact />, { lang })

describe('Contact', () => {

    //iletişim sayfasının doğru şekilde render edildiğini test eder
    test('renders contact page correctly', () => {
        renderContact()
        expect(screen.getByText(/İletişim/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Ad/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/E-posta/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Mesaj/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Gönder/i })).toBeInTheDocument()
    })

    //iletişim formunun doğru şekilde çalıştığını test eder
    test('submits contact form correctly', async () => {
        renderContact()
        const nameInput = screen.getByLabelText(/Ad/i)
        const emailInput = screen.getByLabelText(/E-posta/i)
        const messageInput = screen.getByLabelText(/Mesaj/i)
        const submitButton = screen.getByRole('button', { name: /Gönder/i })

        await userEvent.type(nameInput, 'John Doe')
        await userEvent.type(emailInput, 'john@example.com')
        await userEvent.type(messageInput, 'Hello, this is a test message.')
        await userEvent.click(submitButton)

        expect(screen.getByText('Teşekkürler John Doe, mesajınız alındı!')).toBeInTheDocument()
    })

    describe('English', () => {
        test('renders contact page in English', () => {
            renderContact('en')
            expect(screen.getByRole('heading', { level: 1, name: 'Contact' })).toBeInTheDocument()
            expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/Message/i)).toBeInTheDocument()
            expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument()
        })

        test('shows the success message in English', async () => {
            renderContact('en')
            await userEvent.type(screen.getByLabelText(/Full Name/i), 'John Doe')
            await userEvent.type(screen.getByLabelText(/Email/i), 'john@example.com')
            await userEvent.type(screen.getByLabelText(/Message/i), 'Hello!')
            await userEvent.click(screen.getByRole('button', { name: /Send/i }))

            expect(screen.getByText('Thank you John Doe, we received your message!')).toBeInTheDocument()
        })

        test('translates the success message when the language changes', async () => {
            renderWithProviders(
                <>
                    <LanguageSwitcher />
                    <Contact />
                </>
            )
            await userEvent.type(screen.getByLabelText(/Ad/i), 'Ayşe')
            await userEvent.type(screen.getByLabelText(/E-posta/i), 'ayse@example.com')
            await userEvent.type(screen.getByLabelText(/Mesaj/i), 'Merhaba')
            await userEvent.click(screen.getByRole('button', { name: /Gönder/i }))
            expect(screen.getByText('Teşekkürler Ayşe, mesajınız alındı!')).toBeInTheDocument()

            await userEvent.click(screen.getByRole('button', { name: 'English' }))
            expect(screen.getByText('Thank you Ayşe, we received your message!')).toBeInTheDocument()
        })
    })


    //validation hatalarını test eder
    // test('shows validation errors when form is submitted empty', async () => {
    //     renderContact()
    //     const submitButton = screen.getByRole('button', { name: /Gönder/i })
    //     await userEvent.click(submitButton)

    //     expect(await screen.findByText(/Ad alanı zorunludur/i)).toBeInTheDocument()
    //     expect(await screen.findByText(/E-posta alanı zorunludur/i)).toBeInTheDocument()
    //     expect(await screen.findByText(/Mesaj alanı zorunludur/i)).toBeInTheDocument()
    // })
})
