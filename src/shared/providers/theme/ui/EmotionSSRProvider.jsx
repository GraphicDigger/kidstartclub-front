import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'

export function createEmotionSSRCache() {
    return createCache({ key: 'css', prepend: true })
}

export function EmotionSSRProvider({ children, cache }) {
    return <CacheProvider value={cache}>{children}</CacheProvider>
}

export function getEmotionSSRStyles(cache) {
    const {
        extractCriticalToChunks, // извлекает критические стили
        constructStyleTagsFromChunks // преобразует стили в HTML теги
    } = createEmotionServer(cache)

    return {
        extractCriticalToChunks,
        constructStyleTagsFromChunks
    }
}