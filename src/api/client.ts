import axios from 'axios'

// TheMealDB: ücretsiz, anahtar gerektirmeyen yemek API'si (https://www.themealdb.com/api.php)
export const mealApi = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  timeout: 10000,
})
