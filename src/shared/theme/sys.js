/** Semantic system tokens; color roles map to CSS variables in tokens.scss where applicable */
export const sys = {
  color: {
    primary: 'var(--sys-primary)',
    onPrimary: 'var(--sys-onPrimary)',
    primaryContainer: 'var(--sys-primaryContainer)',
    onPrimaryContainer: 'var(--sys-onPrimaryContainer)',

    success: 'var(--sys-success)',
    onSuccess: 'var(--sys-onSuccess)',
    successContainer: 'var(--sys-successContainer)',
    onSuccessContainer: 'var(--sys-onSuccessContainer)',

    warning: 'var(--sys-warning)',
    onWarning: 'var(--sys-onWarning)',
    warningContainer: 'var(--sys-warningContainer)',
    onWarningContainer: 'var(--sys-onWarningContainer)',

    error: 'var(--sys-error)',
    onError: 'var(--sys-onError)',
    errorContainer: 'var(--sys-errorContainer)',
    onErrorContainer: 'var(--sys-onErrorContainer)',

    surface: 'var(--sys-surface)',
    onSurface: 'var(--sys-onSurface)',
    onSurfaceVariant: 'var(--sys-onSurfaceVariant)',

    surfaceContainer: {
      lowest: 'var(--sys-surfaceContainer-lowest)',
      low: 'var(--sys-surfaceContainer-low)',
      default: 'var(--sys-surfaceContainer-default)',
      high: 'var(--sys-surfaceContainer-high)',
      highest: 'var(--sys-surfaceContainer-highest)',
    },
  },

  typography: {
    color: {
      default: 'var(--sys-color-on-surface)',
      muted: 'var(--sys-color-on-surface-variant)',
      inverse: 'var(--sys-color-on-primary)',
    },
    label: {
      small: {
        fontSize: 'var(--ref-typography-label-small-fontSize)',
        lineHeight: 'var(--ref-typography-label-small-lineHeight)',
        fontWeight: 'var(--ref-typography-label-small-fontWeight)',
        letterSpacing: 'var(--ref-typography-label-small-letterSpacing)',
      },
      medium: {
        fontSize: 'var(--ref-typography-label-medium-fontSize)',
        lineHeight: 'var(--ref-typography-label-medium-lineHeight)',
        fontWeight: 'var(--ref-typography-label-medium-fontWeight)',
        letterSpacing: 'var(--ref-typography-label-medium-letterSpacing)',
      },
      large: {
        fontSize: 'var(--ref-typography-label-large-fontSize)',
        lineHeight: 'var(--ref-typography-label-large-lineHeight)',
        fontWeight: 'var(--ref-typography-label-large-fontWeight)',
        letterSpacing: 'var(--ref-typography-label-large-letterSpacing)',
      },
    },
    body: {
      small: {
        fontSize: 'var(--ref-typography-body-small-fontSize)',
        lineHeight: 'var(--ref-typography-body-small-lineHeight)',
        fontWeight: 'var(--ref-typography-body-small-fontWeight)',
        letterSpacing: 'var(--ref-typography-body-small-letterSpacing)',
      },
      medium: {
        fontSize: 'var(--ref-typography-body-medium-fontSize)',
        lineHeight: 'var(--ref-typography-body-medium-lineHeight)',
        fontWeight: 'var(--ref-typography-body-medium-fontWeight)',
        letterSpacing: 'var(--ref-typography-body-medium-letterSpacing)',
      },
      large: {
        fontSize: 'var(--ref-typography-body-large-fontSize)',
        lineHeight: 'var(--ref-typography-body-large-lineHeight)',
        fontWeight: 'var(--ref-typography-body-large-fontWeight)',
        letterSpacing: 'var(--ref-typography-body-large-letterSpacing)',
      },
    },
    display: {
      small: {
        fontSize: 'var(--ref-typography-display-small-fontSize)',
        lineHeight: 'var(--ref-typography-display-small-lineHeight)',
        fontWeight: 'var(--ref-typography-display-small-fontWeight)',
        letterSpacing: 'var(--ref-typography-display-small-letterSpacing)',
      },
      medium: {
        fontSize: 'var(--ref-typography-display-medium-fontSize)',
        lineHeight: 'var(--ref-typography-display-medium-lineHeight)',
        fontWeight: 'var(--ref-typography-display-medium-fontWeight)',
        letterSpacing: 'var(--ref-typography-display-medium-letterSpacing)',
      },
      large: {
        fontSize: 'var(--ref-typography-display-fontSize)',
        lineHeight: 'var(--ref-typography-display-large-lineHeight)',
        fontWeight: 'var(--ref-typography-display-large-fontWeight)',
        letterSpacing: 'var(--ref-typography-display-large-letterSpacing)',
      },
    },
    title: {
      large: {
        fontSize: 'var(--ref-typography-title-large-fontSize)',
        lineHeight: 'var(--ref-typography-title-large-lineHeight)',
        fontWeight: 'var(--ref-typography-title-large-fontWeight)',
        letterSpacing: 'var(--ref-typography-title-large-letterSpacing)',
      },
      medium: {
        fontSize: 'var(--ref-typography-title-medium-fontSize)',
        lineHeight: 'var(--ref-typography-title-medium-lineHeight)',
        fontWeight: 'var(--ref-typography-title-medium-fontWeight)',
        letterSpacing: 'var(--ref-typography-title-medium-letterSpacing)',
      },
      small: {
        fontSize: 'var(--ref-typography-title-small-fontSize)',
        lineHeight: 'var(--ref-typography-title-small-lineHeight)',
        fontWeight: 'var(--ref-typography-title-small-fontWeight)',
        letterSpacing: 'var(--ref-typography-title-small-letterSpacing)',
      },
    },
    headline: {
      small: {
        fontSize: 'var(--ref-typography-headline-small-fontSize)',
        lineHeight: 'var(--ref-typography-headline-small-lineHeight)',
        fontWeight: 'var(--ref-typography-headline-small-fontWeight)',
        letterSpacing: 'var(--ref-typography-headline-small-letterSpacing)',
      },
      medium: {
        fontSize: 'var(--ref-typography-headline-medium-fontSize)',
        lineHeight: 'var(--ref-typography-headline-medium-lineHeight)',
        fontWeight: 'var(--ref-typography-headline-medium-fontWeight)',
        letterSpacing: 'var(--ref-typography-headline-medium-letterSpacing)',
      },
      large: {
        fontSize: 'var(--ref-typography-headline-large-fontSize)',
        lineHeight: 'var(--ref-typography-headline-large-lineHeight)',
        fontWeight: 'var(--ref-typography-headline-large-fontWeight)',
        letterSpacing: 'var(--ref-typography-headline-large-letterSpacing)',
      },
    },
    caps: {
      small: {
        fontSize: 'var(--ref-typography-label-small-fontSize)',
        lineHeight: 'var(--ref-typography-label-small-lineHeight)',
        fontWeight: 600,
        letterSpacing: 1,
        textTransform: 'uppercase',
      },
      medium: {
        fontSize: 'var(--ref-typography-label-medium-fontSize)',
        lineHeight: 'var(--ref-typography-label-medium-lineHeight)',
        fontWeight: 600,
        letterSpacing: 1,
        textTransform: 'uppercase',
      },
      large: {
        fontSize: 'var(--ref-typography-label-large-fontSize)',
        lineHeight: 'var(--ref-typography-label-large-lineHeight)',
        fontWeight: 600,
        letterSpacing: 1,
        textTransform: 'uppercase',
      },
    },
  },
  breakpoints: {
    xsmall: 375,
    small: 576,
    medium: 768,
    large: 992,
    xlarge: 1200,
    xxlarge: 1600,
    xxxlarge: 1920,
  },
  spacing: {
    xsmall: '4px',
    small: '8px',
    medium: '16px',
    large: '24px',
    xlarge: '32px',
    xxlarge: '40px',
  },
  zIndex: {
    level: (n) => n * 100,
    layers: {
      base: 0,
      baseUI: 100,
      floating: 200,
      overlay: 300,
      modal: 400,
      tooltip: 500,
    },
  },
  borderRadius: {
    xsmall: '4px',
    small: '8px',
    medium: '12px',
    large: '16px',
  },
  size: {
    small: '32px',
    medium: '36px',
    large: '40px',
    xlarge: '48px',
    xxlarge: '56px',
  },
  outline: {
    lowest: 'var(--sys-outline-lowest)',
    low: 'var(--sys-outline-low)',
    default: 'var(--sys-outline-default)',
    high: 'var(--sys-outline-high)',
    highest: 'var(--sys-outline-highest)',
  },

  state: {
    hover: 'var(--sys-state-hover)',
    focus: 'var(--sys-state-focus)',
    selected: 'var(--sys-state-selected)',
    dragged: 'var(--sys-state-dragged)',
  },
}
