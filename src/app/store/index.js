import { configureStore } from '@reduxjs/toolkit';
import { dotByDotReducer } from '@/games/dotByDot';

export const store = configureStore({
    reducer: {
        dotByDot: dotByDotReducer,
    }
});