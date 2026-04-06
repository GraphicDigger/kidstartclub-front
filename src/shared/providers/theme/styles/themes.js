import { ref } from './ref';
import { sysLight, sysDark } from './sys';
import { button } from './components/button';

const createMedia = (bp) => {
  const max = Object.fromEntries(
    Object.entries(bp).map(([key, value]) => [key, `@media (max-width: ${value}px)`])
  )
  const min = Object.fromEntries(
    Object.entries(bp).map(([key, value]) => [key, `@media (min-width: ${value}px)`])
  )
  return { max, min }
}


export const lightTheme = {
  name: 'light',
  ref: { ...ref },
  sys: { ...sysLight },
  comp: {
    button: { ...button.light },
  },
  media: { ...createMedia(ref.breakpoints) }, //theme.media.max.sm

}

export const darkTheme = {
  name: 'dark',
  ref: { ...ref },
  sys: { ...sysDark },
  comp: {
    button: { ...button.dark },
  },
  media: { ...createMedia(ref.breakpoints) },
};