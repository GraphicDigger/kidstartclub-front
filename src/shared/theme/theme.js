import { sys } from './sys';
import { buttonResolved } from './comp-button';

const createMedia = (bp) => {
  const max = Object.fromEntries(
    Object.entries(bp).map(([key, value]) => [key, `@media (max-width: ${value}px)`])
  )
  const min = Object.fromEntries(
    Object.entries(bp).map(([key, value]) => [key, `@media (min-width: ${value}px)`])
  )
  return { max, min }
}

export const theme = {
  sys: { ...sys },
  comp: {
    button: { ...buttonResolved },
  },
  media: { ...createMedia(sys.breakpoints) },
}
