'use client'

import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { useState } from 'react'

function createEmotionCache() {
  return createCache({ key: 'css', prepend: true })
}

export function EmotionProvider({ children }) {
  const [cache] = useState(() => createEmotionCache())

  useServerInsertedHTML(() => {
    const tags = cache.sheet.tags
    cache.sheet.flush()

    return (
      <>
        {tags.map((tag) => (
          <style
            key={tag.getAttribute('data-emotion')}
            data-emotion={`${cache.key} ${tag.getAttribute('data-emotion')}`}
            dangerouslySetInnerHTML={{ __html: tag.innerHTML }}
          />
        ))}
      </>
    )
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}
