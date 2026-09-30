import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './mocks/server'

// Mock'lanmamış bir isteğe çıkılırsa test hata versin (yanlışlıkla gerçek API'ye gidilmesin)
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterEach(() => {
  cleanup()
  // Bir testte server.use(...) ile eklenen handler'lar sonraki testlere taşınmasın
  server.resetHandlers()
  // Dil seçimi (localStorage) ve modal durumu (sessionStorage) testler arasında taşınmasın
  localStorage.clear()
  sessionStorage.clear()
})

afterAll(() => server.close())
