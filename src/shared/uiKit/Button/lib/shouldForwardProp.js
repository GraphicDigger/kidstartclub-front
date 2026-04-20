/** Не прокидывать в DOM: theme и transient-пропы ($…). */
export const shouldForwardProp = (prop) => prop !== 'theme' && !prop.startsWith('$');
