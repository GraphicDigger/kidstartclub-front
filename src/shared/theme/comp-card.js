import { sys } from './sys'

export const card = {
  headline: {
    fontSize: sys.typography.headline?.small?.fontSize,
    "@container (min-width: ${media.min.medium}px)": {
      fontSize: sys.typography.headline?.medium?.fontSize,
    },
  }
}