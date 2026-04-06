'use client'

import { useTheme } from '@emotion/react'
import { useEffect } from 'react'

export function ThemeCSSInjector() {
  const theme = useTheme()

  useEffect(() => {
    if (!theme) return

    const root = document.documentElement

    // refs
    Object.entries(theme.ref.color).forEach(([key, value]) => {
      root.style.setProperty(`--ref-color-${key}`, value)
    })

    Object.entries(theme.ref.palette).forEach(([key, value]) => {
      root.style.setProperty(`--ref-palette-${key}`, value)
    })

    if (theme.ref.control?.height) {
      Object.entries(theme.ref.control.height).forEach(([key, value]) => {
        root.style.setProperty(`--control-height-${key}`, value)
      })
    }

    // Typography variables from ref
    if (theme.ref.typography) {
      Object.entries(theme.ref.typography).forEach(([category, sizes]) => {
        if (typeof sizes === 'object') {
          Object.entries(sizes).forEach(([size, value]) => {
            if (typeof value === 'object') {
              // For nested objects like body.sm = { fontSize, lineHeight, fontWeight }
              Object.entries(value).forEach(([prop, propValue]) => {
                root.style.setProperty(`--ref-typography-${category}-${size}-${prop}`, propValue)
              })
            } else {
              // For simple values like fontSize.small = '14px'
              root.style.setProperty(`--ref-typography-${category}-${size}`, value)
            }
          })
        }
      })
    }

    // Shape variables
    if (theme.ref.shape) {
      Object.entries(theme.ref.shape).forEach(([category, sizes]) => {
        if (typeof sizes === 'object') {
          Object.entries(sizes).forEach(([size, value]) => {
            root.style.setProperty(`--ref-shape-${category}-${size}`, value)
          })
        }
      })
    }

    // if (theme.ref.breakpoints) {
    //   Object.entries(theme.ref.breakpoints).forEach(([key, value]) => {
    //     root.style.setProperty(`--ref-breakpoints-${key}`, `${value}px`)
    //   })
    // }

    // sys colors
    Object.entries(theme.sys.color).forEach(([key, value]) => {
      if (typeof value === 'object') {
        // Для вложенных объектов (typography)
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--sys-${key}-${subKey}`, subValue)
        })
      } else {
        root.style.setProperty(`--sys-${key}`, value)
      }
    })

    // sys outline
    if (theme.sys.outline) {
      Object.entries(theme.sys.outline).forEach(([key, value]) => {
        root.style.setProperty(`--sys-outline-${key}`, value)
      })
    }

    // sys state
    if (theme.sys.state) {
      Object.entries(theme.sys.state).forEach(([key, value]) => {
        root.style.setProperty(`--sys-state-${key}`, value)
      })
    }

    // 8. Устанавливаем тему на html элемент
    root.setAttribute('data-theme', theme.name)

  }, [theme])

  return null
}