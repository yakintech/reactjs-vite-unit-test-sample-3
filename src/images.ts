import type { CSSProperties } from 'react'

export const img = (id: string, width = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`

export const bgPhoto = (id: string) => ({ '--photo': `url('${img(id, 1920)}')` }) as CSSProperties
