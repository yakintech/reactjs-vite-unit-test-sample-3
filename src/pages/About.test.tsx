
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import About from './About'
import type { Language } from '../i18n/LanguageContext'
import { renderWithProviders } from '../test-utils'


const renderAbout = (lang: Language = 'tr') => renderWithProviders(<About />, { lang })

describe('About page', () => {


    //hero section
    test('renders hero section with correct heading and paragraph', () => {
        renderAbout()
        const heading = screen.getByRole('heading', { name: /Hakkımızda/i })
        const paragraph = screen.getByText(/Bir aile hikâyesi, bir lezzet tutkusu./i)
        expect(heading).toBeInTheDocument()
        expect(paragraph).toBeInTheDocument()
    })

    //split section
    test('renders split section with correct heading and paragraphs', () => {
        renderAbout()
        const heading = screen.getByRole('heading', { name: /Ev yapımı lezzetler, 15 yıllık tecrübe/i })
        const paragraph1 = screen.getByText(/Lezzet Durağı, 2010 yılından beri misafirlerine ev yapımı lezzetler sunan bir aile restoranıdır./i)
        const paragraph2 = screen.getByText(/Malzemelerimizi her sabah yerel üreticilerden temin ediyor, tüm yemeklerimizi günlük olarak hazırlıyoruz./i)
        expect(heading).toBeInTheDocument()
        expect(paragraph1).toBeInTheDocument()
        expect(paragraph2).toBeInTheDocument()
    })

    //stats section
    test('renders stats section with correct values and labels', () => {
        renderAbout()
        const stats = [
            { value: '15+', label: 'Yıllık tecrübe' },
            { value: '40+', label: 'Çeşit yemek' },
            { value: '120', label: 'Kişilik kapasite' },
            { value: '4.8★', label: 'Misafir puanı' },
        ]
        stats.forEach((s) => {
            const value = screen.getByText(s.value)
            const label = screen.getByText(s.label)
            expect(value).toBeInTheDocument()
            expect(label).toBeInTheDocument()
        })
    })

    //gallery section
    test('renders gallery section with correct heading and images', () => {
        renderAbout()
        const heading = screen.getByRole('heading', { name: /Mutfağımızdan kareler/i })
        expect(heading).toBeInTheDocument()
        
        //sadece bu sectiondaki img elementlerini kontrol etmek için
        const gallerySection = heading.closest('section')
        const images = gallerySection?.querySelectorAll('img')
        expect(images).toHaveLength(4)
        const alts = ['Tabak', 'Kase', 'Teras', 'Sofra']
        alts.forEach((alt) => {
            const img = screen.getByAltText(alt)
            expect(img).toBeInTheDocument()
        })

    })

    describe('English', () => {
        test('renders hero and story sections in English', () => {
            renderAbout('en')
            expect(screen.getByRole('heading', { level: 1, name: 'About Us' })).toBeInTheDocument()
            expect(screen.getByRole('heading', { name: /Homemade flavors, 15 years of experience/i })).toBeInTheDocument()
            expect(screen.getByAltText('Our chef')).toBeInTheDocument()
        })

        test('renders stats labels in English', () => {
            renderAbout('en')
            const labels = ['Years of experience', 'Dishes', 'Seats', 'Guest rating']
            labels.forEach((label) => {
                expect(screen.getByText(label)).toBeInTheDocument()
            })
        })

        test('renders gallery images with English alt texts', () => {
            renderAbout('en')
            const alts = ['Plate', 'Bowl', 'Terrace', 'Table']
            alts.forEach((alt) => {
                expect(screen.getByAltText(alt)).toBeInTheDocument()
            })
        })
    })
})
