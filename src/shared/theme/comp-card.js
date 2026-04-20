import { sys } from './sys'

export const card = {
  title: {
    fontSize: sys.typography.heading?.small?.fontSize,
    "@container (min-width: ${media.min.medium}px)": {
      fontSize: sys.typography.heading?.medium?.fontSize,
    },
  }
}