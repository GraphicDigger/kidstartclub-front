'use client'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { useMemo } from 'react'
import { lightTheme, darkTheme } from '../styles/themes'

export function ThemeProvider({ children, mode = 'light' }) {
    const theme = useMemo( () => {
        return (mode === 'dark' ? darkTheme : lightTheme)
    },[mode])

    return <EmotionThemeProvider theme={theme}> {children} </EmotionThemeProvider>
}
