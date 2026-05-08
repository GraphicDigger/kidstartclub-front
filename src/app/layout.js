import "./globals.scss";
import { Providers } from '../shared/providers/providers';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  description: 'Описание вашего приложения',
  keywords: 'ключевые слова, для поиска',
  other: { google: 'notranslate' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
