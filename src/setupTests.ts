import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
  // Dil seçimi (localStorage) ve modal durumu (sessionStorage) testler arasında taşınmasın
  localStorage.clear()
  sessionStorage.clear()
})
