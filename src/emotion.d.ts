import '@emotion/react'

/** Соответствует `theme` из ThemeProvider / `src/shared/theme/theme.js` */
declare module '@emotion/react' {
  export interface Theme {
    sys: {
      typography: {
        title?: Record<string, { fontSize?: string; lineHeight?: string; fontWeight?: number; letterSpacing?: string | number; textTransform?: string }>
        display?: Record<string, { fontSize?: string; lineHeight?: string; fontWeight?: number; letterSpacing?: string | number; textTransform?: string }>
        label?: Record<string, { fontSize?: string; lineHeight?: string; fontWeight?: number; letterSpacing?: string | number; textTransform?: string }>
        body?: Record<string, { fontSize?: string; lineHeight?: string; fontWeight?: number; letterSpacing?: string | number; textTransform?: string }>
        headline?: Record<string, { fontSize?: string; lineHeight?: string; fontWeight?: number; letterSpacing?: string | number; textTransform?: string }>
        caps?: Record<string, { fontSize?: string; lineHeight?: string; fontWeight?: number; letterSpacing?: string | number; textTransform?: string }>
        color: Record<string, string>
        fontWeight: Record<string, number>
      }
      color: Record<string, string>
      outline: Record<string, string>
      spacing: Record<string, string>
      size: Record<string, string>
      borderRadius: Record<string, string>
      breakpoints: Record<string, number>
    }
    comp: Record<string, unknown>
    media: Record<string, unknown>
  }
}
