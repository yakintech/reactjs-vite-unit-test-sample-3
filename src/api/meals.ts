import { mealApi } from './client'

export type Meal = {
  id: string
  name: string
  thumbnail: string
}

type MealResponse = {
  // Sonuç yoksa API boş dizi yerine null döndürüyor
  meals: { idMeal: string; strMeal: string; strMealThumb: string }[] | null
}

export async function getMealsByArea(area: string, signal?: AbortSignal): Promise<Meal[]> {
  const { data } = await mealApi.get<MealResponse>('/filter.php', { params: { a: area }, signal })

  return (data.meals ?? []).map((m) => ({
    id: m.idMeal,
    name: m.strMeal,
    thumbnail: m.strMealThumb,
  }))
}
