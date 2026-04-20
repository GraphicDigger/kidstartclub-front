const TYPOGRAPHY_STYLE_PROPS = ['variant', 'color', 'size', 'lineHeight', 'weight']

/** Не прокидывать в DOM: theme/as — иначе `as` утечёт как атрибут у span и не сработает полиморф (h2, p, …). */
 export const shouldForwardProp = (prop: string) =>
  !TYPOGRAPHY_STYLE_PROPS.includes(prop) &&
  prop !== 'as' &&
  prop !== 'theme'