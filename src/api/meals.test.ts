import axios from 'axios'
import { delay, http, HttpResponse } from 'msw'
import { MEAL_API_URL } from './client'
import { getMealsByArea } from './meals'
import { server } from '../mocks/server'

describe('getMealsByArea', () => {
    //Başarılı istek: API yanıtı sade Meal tipine dönüştürülüyor mu?
    it('returns meals mapped to the Meal type', async () => {
        const meals = await getMealsByArea('Turkish')

        expect(meals).toHaveLength(3)
        expect(meals[0]).toEqual({
            id: '53262',
            name: 'Adana kebab',
            thumbnail: 'https://www.themealdb.com/images/media/meals/04axct1763793018.jpg',
        })
    })

    //İstek doğru adrese, doğru parametreyle gidiyor mu?
    it('requests the filter endpoint with the area parameter', async () => {
        let requestedUrl: URL | undefined
        server.use(
            http.get(`${MEAL_API_URL}/filter.php`, ({ request }) => {
                requestedUrl = new URL(request.url)
                return HttpResponse.json({ meals: [] })
            })
        )

        await getMealsByArea('Italian')

        expect(requestedUrl?.pathname).toBe('/api/json/v1/1/filter.php')
        expect(requestedUrl?.searchParams.get('a')).toBe('Italian')
    })

    //API sonuç bulamayınca meals: null döndürüyor; fonksiyon boş dizi vermeli
    it('returns an empty array when the API returns meals: null', async () => {
        const meals = await getMealsByArea('Atlantis')

        expect(meals).toEqual([])
    })

    //Sunucu hatasında hata fırlatılıyor mu?
    it('throws when the server responds with an error', async () => {
        server.use(
            http.get(`${MEAL_API_URL}/filter.php`, () => new HttpResponse(null, { status: 500 }))
        )

        await expect(getMealsByArea('Turkish')).rejects.toMatchObject({
            response: { status: 500 },
        })
    })

    //Ağ hatasında (internet yok vb.) hata fırlatılıyor mu?
    it('throws when the network fails', async () => {
        server.use(
            http.get(`${MEAL_API_URL}/filter.php`, () => HttpResponse.error())
        )

        await expect(getMealsByArea('Turkish')).rejects.toThrow()
    })

    //AbortSignal ile iptal edilen istek iptal hatası veriyor mu?
    it('can be cancelled with an AbortSignal', async () => {
        server.use(
            http.get(`${MEAL_API_URL}/filter.php`, async () => {
                await delay('infinite')
                return HttpResponse.json({ meals: [] })
            })
        )
        const controller = new AbortController()

        const request = getMealsByArea('Turkish', controller.signal)
        controller.abort()

        const error = await request.catch((e: unknown) => e)
        expect(axios.isCancel(error)).toBe(true)
    })
})
