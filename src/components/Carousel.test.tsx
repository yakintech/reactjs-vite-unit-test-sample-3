
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Language } from '../i18n/LanguageContext'
import { renderWithProviders } from '../test-utils'

import { afterEach, beforeEach, describe, expect, vi } from 'vitest'
import Carousel from './Carousel'


const renderCarousel = (lang: Language = 'tr') => {
    renderWithProviders(
            <Carousel
                label="Yemeklerimiz"
                slides={[
                    {
                        photo: 'https://picsum.photos/id/1018/1000/600/',
                        title: 'Yemek 1',
                        caption: 'Lezzetli yemek 1',
                    },
                    {
                        photo: 'https://picsum.photos/id/1015/1000/600/',
                        title: 'Yemek 2',
                        caption: 'Lezzetli yemek 2',
                    },
                    {
                        photo: 'https://picsum.photos/id/1019/1000/600/',
                        title: 'Yemek 3',
                        caption: 'Lezzetli yemek 3',
                    },
                ]}
            />,
        { lang }
    )
}

describe('Carousel', () => {
    //Önce Yemeklerimiz galerisi genel render. viewport section
    it('renders the carousel with the correct label', () => {
        renderCarousel()
        const carousel = screen.getByRole('region', { name: 'Yemeklerimiz' })
        expect(carousel).toBeInTheDocument()
    })

    //Slayttaki ileri ve geri butonları ile slayt geçişi

    //Buton etiketleri seçili dile göre değişiyor mu?
    it('renders Turkish button labels', () => {
        renderCarousel()
        expect(screen.getByRole('button', { name: 'Önceki fotoğraf' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Sonraki fotoğraf' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: '1. fotoğrafa git: Yemek 1' })).toBeInTheDocument()
    })

    it('renders English button labels', () => {
        renderCarousel('en')
        expect(screen.getByRole('button', { name: 'Previous photo' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Next photo' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Go to photo 1: Yemek 1' })).toBeInTheDocument()
    })


})