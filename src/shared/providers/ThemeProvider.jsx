'use client'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { useEffect } from 'react'
import { theme } from '../theme/theme'

const stack = []

function apply() {
  if (typeof document === 'undefined') return
  const name = stack.length ? stack[stack.length - 1] : 'light'
  document.documentElement.setAttribute('data-theme', name)
}

export function pushDocumentTheme(name) {
  stack.push(name)
  apply()
}

export function popDocumentTheme() {
  stack.pop()
  apply()
}

/** Registers mode so <html data-theme> matches the innermost provider. */
export function ThemeDocumentSync({ mode = 'light' }) {
  useEffect(() => {
    pushDocumentTheme(mode)
    return () => {
      popDocumentTheme()
    }
  }, [mode])

  return null
}

/** @param {'light'|'dark'} [mode] — same API в приложении и в Storybook (toolbar → mode) */
export function ThemeProvider({ children, mode = 'light' }) {
  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeDocumentSync mode={mode} />
      {children}
    </EmotionThemeProvider>
  )
}
