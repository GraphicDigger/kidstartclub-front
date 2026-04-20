import "./globals.scss";
import { Providers } from '../shared/providers/providers';

export default function RootLayout({ children }) {
  // console.log('Рендерится на:', typeof window === 'undefined' ? 'сервере' : 'клиенте');

  return (
    <html lang="en" data-theme="light">
      <head>
        <meta name="description" content="Описание вашего приложения" />
        <meta name="keywords" content="ключевые слова, для поиска" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google" content="notranslate" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
