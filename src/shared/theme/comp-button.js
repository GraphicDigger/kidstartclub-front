import { sys } from './sys'

/**
 * Две формы:
 * - `button` — variant → intent → state: функции `(c) => { background, text, icon }`, вызывать с `buttonIntents[intent]`.
 * - `buttonResolved` — variant → intent → уже развёрнутые default/hover/selected/disabled (для `theme.comp.button`).
 */

const disabled = {
  background: '#555555',
  text: '#333333',
  icon: '#333333',
}

export const buttonIntents = {
  default: {
    main: sys.color.primary,
    on: sys.color.onPrimary,
    container: sys.color.primaryContainer,
    onContainer: sys.color.onPrimaryContainer,
  },
  primary: {
    main: sys.color.primary,
    on: sys.color.onPrimary,
    container: sys.color.primaryContainer,
    onContainer: sys.color.onPrimaryContainer,
  },
  success: {
    main: sys.color.success,
    on: sys.color.onSuccess,
    container: sys.color.successContainer,
    onContainer: sys.color.onSuccessContainer,
  },
  warning: {
    main: sys.color.warning,
    on: sys.color.onWarning,
    container: sys.color.warningContainer,
    onContainer: sys.color.onWarningContainer,
  },
  error: {
    main: sys.color.error,
    on: sys.color.onError,
    container: sys.color.errorContainer,
    onContainer: sys.color.onErrorContainer,
  },
}

/**
 * Стили: `button[variant][intent][state](buttonIntents[intent])`
 */
export const button = {
  filled: {
    default: {
      default: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      hover: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      selected: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      disabled,
    },
    primary: {
      default: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      hover: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      selected: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      disabled,
    },
    success: {
      default: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      hover: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      selected: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      disabled,
    },
    warning: {
      default: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      hover: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      selected: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      disabled,
    },
    error: {
      default: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      hover: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      selected: (c) => ({
        background: c.container,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      disabled,
    },
  },

  lite: {
    default: {
      default: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      hover: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      selected: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      disabled,
    },
    primary: {
      default: (c) => ({
        background: c.container,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      hover: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      selected: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      disabled,
    },
    success: {
      default: (c) => ({
        background: c.container,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      hover: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      selected: (c) => ({
        background: c.container,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      disabled,
    },
    warning: {
      default: (c) => ({
        background: c.container,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      hover: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      selected: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      disabled,
    },
    error: {
      default: (c) => ({
        background: c.container,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      hover: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      selected: (c) => ({
        background: c.container,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      disabled,
    },
  },

  blank: {
    default: {
      default: (c) => ({
        background: 'transparent',
        text: c.on,
        icon: c.on,
      }),
      hover: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      selected: (c) => ({
        background: c.main,
        text: c.on,
        icon: c.on,
      }),
      disabled,
    },
    primary: {
      default: (c) => ({
        background: 'transparent',
        text: c.onContainer,
        icon: c.onContainer,
      }),
      hover: (c) => ({
        background: c.onContainer,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      selected: (c) => ({
        background: c.container,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      disabled,
    },
    success: {
      default: (c) => ({
        background: 'transparent',
        text: c.onContainer,
        icon: c.onContainer,
      }),
      hover: (c) => ({
        background: c.container,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      selected: (c) => ({
        background: c.container,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      disabled,
    },
    warning: {
      default: (c) => ({
        background: 'transparent',
        text: c.onContainer,
        icon: c.onContainer,
      }),
      hover: (c) => ({
        background: c.container,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      selected: (c) => ({
        background: c.container,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      disabled,
    },
    error: {
      default: (c) => ({
        background: 'transparent',
        text: c.onContainer,
        icon: c.onContainer,
      }),
      hover: (c) => ({
        background: c.container,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      selected: (c) => ({
        background: c.container,
        text: c.onContainer,
        icon: c.onContainer,
      }),
      disabled,
    },
  },
}

const intentKeys = Object.keys(buttonIntents)
const variantKeys = ['filled', 'lite', 'blank']

const apply = (row, c) => ({
  default: row.default(c),
  hover: row.hover(c),
  selected: row.selected(c),
  disabled: row.disabled,
})

/**
 * Готовые слои для темы: `theme.comp.button[variant][intent]`
 * (рецепты выше — `button[variant][intent][state](buttonIntents[intent])`).
 */
export const buttonResolved = Object.fromEntries(
  variantKeys.map((v) => [
    v,
    Object.fromEntries(
      intentKeys.map((intent) => {
        const c = buttonIntents[intent]
        return [intent, apply(button[v][intent], c)]
      })
    ),
  ])
)
