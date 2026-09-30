import axios from 'axios'

// TheMealDB: ücretsiz, anahtar gerektirmeyen yemek API'si (https://www.themealdb.com/api.php)
export const MEAL_API_URL = 'https://www.themealdb.com/api/json/v1/1'

export const mealApi = axios.create({
  baseURL: MEAL_API_URL,
  timeout: 10000,
})
