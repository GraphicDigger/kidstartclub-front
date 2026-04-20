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
    body: {
      xsmall: {
        fontSize: '12px',
        lineHeight: 1.4,
        fontWeight: 500,
        letterSpacing: 0,
      },
      small: {
        fontSize: '14px',
        lineHeight: 1.5,
        fontWeight: 500,
        letterSpacing: 0,
      },
      medium: {
        fontSize: '16px',
        lineHeight: 1.5,
        fontWeight: 500,
        letterSpacing: 0,
      },
      large: {
        fontSize: '18px',
        lineHeight: 1.5,
        fontWeight: 500,
        letterSpacing: 0,
      },
    },
    heading: {
      xsmall: {
        fontSize: '24px',
        lineHeight: 1.2,
        fontWeight: 800,
      },
      small: {
        fontSize: '30px',
        lineHeight: 1.2,
        fontWeight: 800,
      },
      medium: {
        fontSize: '45px',
        lineHeight: 1.2,
        fontWeight: 800,
      },
      large: {
        fontSize: '60px',
        lineHeight: 1.1,
        fontWeight: 800,
      },
    },
    caps: {
      small: {
        fontSize: '12px',
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: 1,
        textTransform: 'uppercase',
      },
      medium: {
        fontSize: '14px',
        lineHeight: 1.4,
        fontWeight: 600,
        letterSpacing: 1,
        textTransform: 'uppercase',
      },
      large: {
        fontSize: '16px',
        lineHeight: 1.4,
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
