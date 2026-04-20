import '@emotion/react'

/** Соответствует `theme` из ThemeProvider / `src/shared/theme/theme.js` */
declare module '@emotion/react' {
  export interface Theme {
    sys: {
      typography: {
        body?: Record<string, { fontSize?: string; lineHeight?: string; fontWeight?: number }>
        heading?: Record<string, { fontSize?: string; lineHeight?: string; fontWeight?: number }>
        color: Record<string, string>
        fontWeight: Record<string, number>
      }
      spacing: Record<string, string>
      size: Record<string, string>
      borderRadius: Record<string, string>
      breakpoints: Record<string, number>
    }
    comp: Record<string, unknown>
    media: Record<string, unknown>
  }
}
