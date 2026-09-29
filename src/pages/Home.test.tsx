
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './Home'
import type { Language } from '../i18n/LanguageContext'
import { renderWithProviders } from '../test-utils'

// Home içinde <Link> olduğu için router, metinler için dil sağlayıcısı içinde render edilmeli
const renderHome = (lang: Language = 'tr') => renderWithProviders(<Home />, { lang })


describe("Home Page", () => {
    //Home page analizinde olan testler:
    //1. Hero section testi
    //2. Menu section testi
    //3. Footer section testi
    //4. Split section testi
    //5. Link testi
    //6. Button testi
    //7. Image testi
    //8. Scroll testi
    //9. Eyebrow testi
    //10. Card testi
    //11. Price testi




    describe("Section tests", () => {

        // userEvent.setup()

        //Hero section test
        it("should render hero section", () => {
            renderHome()
            expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Sofranıza gelen\s*gerçek lezzet/)

        })

        describe("Menu section tests", () => {
            //Menu section test
            it("should render menu section", () => {
                renderHome()
                const menuSection = screen.getByText(/Öne Çıkan Lezzetler/i)
                expect(menuSection).toBeInTheDocument()
            })

            //Menü section her zaman en az 4 card render ediyor mu test
            it("should render at least 4 menu cards", () => {
                renderHome()
                const menuCards = screen.getAllByRole('article')
                expect(menuCards.length).toBeGreaterThanOrEqual(4)
            })

            //her box üzerinde resim var mı?
            it("should render image in each menu card", () => {
                renderHome()
                const menuCards = screen.getAllByRole('article')
                menuCards.forEach((card) => {
                    const img = card.querySelector('img')
                    expect(img).toBeInTheDocument()
                })
            })
        })


        //Split section test
        it("should render split section", () => {
            renderHome()
            const splitSection = screen.getByText(/Keyifli bir akşam için her şey hazır/i)
            expect(splitSection).toBeInTheDocument()
        })

        //footer section test ("Masanızı şimdiden ayırtın" yazısı var mı?)
        it("should render footer section", () => {
            renderHome()
            const footerSection = screen.getByText(/Masanızı şimdiden ayırtın/i)
            expect(footerSection).toBeInTheDocument()
        })

        //footerda "Rezervasyon Yap" butonu hover test
        // it("should render footer button", async () => {
        //     renderHome()
        //     const footerButton = screen.getByText(/Rezervasyon Yap/i)
        //     expect(footerButton).toBeInTheDocument()
        //     //footerda "Rezervasyon Yap" butonu hover test
        //     await userEvent.hover(footerButton)
        //     expect(footerButton).toHaveStyle('background-color: darken(blue, 10%)')
        // })

    })

    describe("English", () => {
        it("should render hero section in English", () => {
            renderHome('en')
            expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Real flavor\s*at your table/)
            expect(screen.getByText('Since 2010')).toBeInTheDocument()
        })

        it("should render menu section in English", () => {
            renderHome('en')
            expect(screen.getByRole('heading', { name: 'Featured Dishes' })).toBeInTheDocument()
            expect(screen.getByRole('heading', { name: 'Shish Kebab' })).toBeInTheDocument()
            expect(screen.getByAltText('Strawberry Pudding')).toBeInTheDocument()
        })

        it("should render split and reservation sections in English", () => {
            renderHome('en')
            expect(screen.getByText(/Everything is ready for a lovely evening/i)).toBeInTheDocument()
            expect(screen.getByText(/Reserve your table today/i)).toBeInTheDocument()
            expect(screen.queryByText(/Öne Çıkan Lezzetler/i)).not.toBeInTheDocument()
        })
    })
})

