import { http, HttpResponse } from 'msw'
import { MEAL_API_URL } from '../api/client'
import { turkishMeals } from './data'

// Varsayılan (başarılı) yanıtlar. Tek bir testte farklı yanıt gerekiyorsa server.use(...) ile ezilir.
export const handlers = [
  http.get(`${MEAL_API_URL}/filter.php`, ({ request }) => {
    const area = new URL(request.url).searchParams.get('a')

    // Gerçek API gibi: bilinmeyen mutfak için meals: null döner
    return HttpResponse.json({ meals: area === 'Turkish' ? turkishMeals : null })
  }),
]
