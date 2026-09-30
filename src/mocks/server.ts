import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Testlerde gerçek internete gitmek yerine istekleri yakalayıp sahte yanıt döndürür
export const server = setupServer(...handlers)
