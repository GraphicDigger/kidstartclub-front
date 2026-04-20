import { EmotionProvider } from './EmotionProvider';
import { ThemeProvider } from './ThemeProvider';
import { StoreProvider } from './store';

export function Providers({ children }) {
    return (
        <EmotionProvider>
            <ThemeProvider>
                <StoreProvider>
                    {children}
                </StoreProvider>
            </ThemeProvider>
        </EmotionProvider>
    );
}
