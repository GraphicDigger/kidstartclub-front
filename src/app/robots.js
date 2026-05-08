export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*?*', // Запрещает индексацию страниц с query-параметрами (фильтры, поиск и т.д.)
          '/_next/', // Технические файлы Next.js
          '/api/', // API роуты
        ],
      },
    ],
  }
}
