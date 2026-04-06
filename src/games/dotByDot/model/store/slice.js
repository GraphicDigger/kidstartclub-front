import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { COLORS, CHECK_RESULTS } from '../../const';
import { TOTAL_ROWS } from '../../const';

const generateTargetColors = () => {
    return Array.from({ length: 4 }, () => {
        const randomIndex = Math.floor(Math.random() * COLORS.length);
        return COLORS[randomIndex];
    });
};

const initialState = {
    colors: {},
    currentColorIndex: 0,
    activeRow: TOTAL_ROWS - 1,
    targetColors: [],
    isGameWon: false,
    isGameDone: false,
};

export const dotsSlice = createSlice({
    name: 'dots',
    initialState,
    reducers: {
        setColor: (state, action) => {
            const { rowIndex, colIndex, color } = action.payload;
            state.colors[`${rowIndex}-${colIndex}`] = color;
            state.currentColorIndex = (state.currentColorIndex + 1) % COLORS.length;
        },
        setResults: (state, action) => {
            const { rowIndex, results } = action.payload;
            state.colors[`results-${rowIndex}`] = results;
        },
        moveToNextRow: (state) => {
            if (state.activeRow > 0) {
                state.activeRow -= 1;
            }
        },
        setGameWon: (state) => {
            state.isGameWon = true;
        },
        setGameDone: (state) => {
            state.isGameDone = true;
        },
        resetGame: (state) => {
            const newTargetColors = generateTargetColors();
            return {
                ...initialState,
                targetColors: newTargetColors,
                activeRow: TOTAL_ROWS - 1
            };
        },
        
        copyColorsToNextRow: (state) => {
            const prevRow = state.activeRow + 1;
            const currentRow = state.activeRow;
            console.log('[copyColorsToNextRow] prevRow', prevRow);

            if (currentRow >= 0) {
                for (let colIndex = 0; colIndex < 4; colIndex++) {
                    const prevKey = `${prevRow}-${colIndex}`;
                    const currentKey = `${currentRow}-${colIndex}`;
                    const color = state.colors[prevKey];

                    if (color) {
                        state.colors[currentKey] = color;
                    }
                }
            }
        }
    }
});

// Thunk для проверки цветов и обновления состояния
export const checkAndSetResults = createAsyncThunk(
    'dots/checkAndSetResults',
    async (_, { getState, dispatch }) => {
        // Функция проверки цветов текущей строки с целевыми цветами (внутри слайса)
        const checkColors = (targetColors, currentRowColors) => {
            const results = [];
            const target = [...targetColors];
            const current = [...currentRowColors];

            // Точные совпадения
            for (let i = 0; i < current.length; i++) {
                if (current[i] === target[i]) {
                    results.push(CHECK_RESULTS.EXACT);
                    current[i] = target[i] = null;
                }
            }

            // Частичные совпадения
            for (let i = 0; i < current.length; i++) {
                if (!current[i]) continue;

                const idx = target.indexOf(current[i]);
                if (idx !== -1) {
                    results.push(CHECK_RESULTS.EXISTS);
                    target[idx] = null;
                }
            }

            return results;
        };

        const state = getState();
        const dotsState = state.dotByDot.dots;
        
        // Получаем цвета текущей активной строки
        const activeRow = dotsState.activeRow;
        const currentRowColors = [0, 1, 2, 3].map(colIndex => {
            const key = `${activeRow}-${colIndex}`;
            return dotsState.colors[key] || null;
        });
        
        const targetColors = dotsState.targetColors;
        
        // Проверяем цвета
        const results = checkColors(targetColors, currentRowColors);
        
        // Устанавливаем результаты
        dispatch(setResults({
            rowIndex: activeRow,
            results
        }));
        
        // Проверяем победу
        const isGameWon = results.length === 4 && results.every(r => r === CHECK_RESULTS.EXACT);
        if (isGameWon) {
            dispatch(setGameWon());
        }
        
        // Если игра выиграна, не переходим на следующую строку
        if (!isGameWon) {
            // Проверяем, была ли это последняя строка
            const wasLastRow = activeRow === 0;
            
            // Переходим на следующую строку
            dispatch(moveToNextRow());
            
            // Копируем цвета только если это не была последняя строка
            if (!wasLastRow) {
                dispatch(copyColorsToNextRow());
            }
            
            // Если это была последняя строка, игра завершена
            if (wasLastRow) {
                dispatch(setGameDone());
            }
        }
        
        return results;
    }
);

export const {
    setColor,
    setResults,
    moveToNextRow,
    setGameWon,
    setGameDone,
    resetGame,
    copyColorsToNextRow
} = dotsSlice.actions;

export default dotsSlice.reducer;
