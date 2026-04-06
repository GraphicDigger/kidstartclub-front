'use client'
// EmotionProvider (Client-side) - Основной провайдер

import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { useState } from 'react'

// создает кеш для CSS стилей с ключом 'css'
// prepend: true - добавляет стили в начало head
function createEmotionCache() {
  return createCache({ key: 'css', prepend: true })
}

export function EmotionProvider({ children }) {
  const [cache] = useState(() => createEmotionCache())

  //хук Next.js для вставки HTML на сервере
  useServerInsertedHTML(() => {
    const tags = cache.sheet.tags
    // очищает кеш после извлечения стилей
    cache.sheet.flush()
    
    // Возвращает <style> теги с инлайн CSS для SSR
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


//На сервере (SSR):
//1. Next.js рендерит компоненты
// 2. Emotion собирает CSS в кеш
// 3. useServerInsertedHTML извлекает стили
// 4. Стили вставляются в <head> как <style> теги
// 5. HTML отправляется браузеру со всеми стилями


//На клиенте (CSR):
// 1. React подключается к серверному HTML
// 2. Emotion создает новый кеш
// 3. Серверные стили удаляются
// 4. Новые стили добавляются динамически