
import { act, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WelcomeModal from './WelcomeModal'
import type { Language } from '../i18n/LanguageContext'
import { renderWithProviders } from '../test-utils'

import { afterEach, beforeEach, describe, expect, vi } from 'vitest'


const renderWelcomeModal = (lang: Language = 'tr') => renderWithProviders(<WelcomeModal />, { lang })

describe('WelcomeModal', () => {
    beforeEach(() => {
        // Modal oturumda bir kez açılıyor; her test temiz bir oturumla başlasın
        sessionStorage.clear()
    })

    afterEach(() => {
        // Test hata verse bile fake zamanlayıcı sonraki testlere taşınmasın
        vi.useRealTimers()
    })

    //5 saniye sonra modalin kapanıp kapanmadığını test eder
    test('closes modal after 5 seconds', async () => {
        //fake bir zamanlayıcı kullanıyorum.
        vi.useFakeTimers()
        renderWelcomeModal()
        expect(screen.getByText(/Hoş geldiniz/i)).toBeInTheDocument()
        // 5 saniye sonra kapanış animasyonu başlıyor
        act(() => {
            vi.advanceTimersByTime(5000)
        })
        // Animasyon bitince (300 ms) modal DOM'dan kalkıyor.
        // Ayrı act gerekiyor: 300 ms'lik zamanlayıcı ancak ilk act bittikten sonra kuruluyor.
        act(() => {
            vi.advanceTimersByTime(300)
        })
        expect(screen.queryByText(/Hoş geldiniz/i)).not.toBeInTheDocument()
    })

    describe('English', () => {
        test('renders modal content in English', () => {
            renderWelcomeModal('en')
            expect(screen.getByRole('dialog', { name: 'A story on every plate' })).toBeInTheDocument()
            expect(screen.getByText('Welcome')).toBeInTheDocument()
            expect(screen.getByRole('button', { name: 'Start Exploring' })).toBeInTheDocument()
        })

        test('closes modal with the English close button', () => {
            vi.useFakeTimers()
            renderWelcomeModal('en')
            fireEvent.click(screen.getByRole('button', { name: 'Close' }))
            act(() => {
                vi.advanceTimersByTime(300)
            })
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })
    })


    //Add snapshot test for WelcomeModal
    test('matches snapshot', () => {
        const { asFragment } = renderWelcomeModal()
        expect(asFragment()).toMatchSnapshot()
    })
})
