import { EmotionProvider, ThemeProvider, ThemeCSSInjector } from './theme';
import { StoreProvider } from './store';

export function Providers({ children }) {
    // console.log('Рендерится на:', typeof window === 'undefined' ? 'сервере' : 'клиенте');

    return (
        <EmotionProvider>
            <ThemeProvider>
                <ThemeCSSInjector />
                <StoreProvider>
                    {children}
                </StoreProvider>
            </ThemeProvider>
        </EmotionProvider>
    );
} 