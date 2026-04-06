import { createSelector } from '@reduxjs/toolkit';


export const selectGameMode = state => state.dotByDot.modes.gameMode;
export const selectSpecificationMode = state => state.dotByDot.modes.specificationMode;
export const isSpecificationMode = state => state.dotByDot.modes.specificationMode !== null;

export const selectColors = state => state.dotByDot.dots.colors;
export const selectCurrentColorIndex = state => state.dotByDot.dots.currentColorIndex;
export const selectActiveRow = state => state.dotByDot.dots.activeRow;
export const selectTargetColors = state => state.dotByDot.dots.targetColors;
export const selectIsGameWon = state => state.dotByDot.dots.isGameWon;
export const selectIsGameDone = state => state.dotByDot.dots.isGameDone;


// Мемоизированные селекторы с использованием createSelector
export const selectCellState = createSelector(
    [selectColors, selectActiveRow, (state, cellId) => cellId],
    (colors, activeRow, cellId) => {
        if (!cellId) return { color: '', isDisabled: false, isActive: false };
        
        const [rowIndex, colIndex] = cellId.split('-').map(Number);
        
        return {
            color: colors[cellId] || '',
            isDisabled: rowIndex < activeRow,
            isActive: rowIndex === activeRow
        };
    }
);


// Селектор для получения цветов текущей активной строки
export const selectCurrentRowColors = createSelector(
    [selectColors, selectActiveRow],
    (colors, activeRow) => {
        return [0, 1, 2, 3].map(colIndex => {
            const key = `${activeRow}-${colIndex}`;
            return colors[key] || null;
        });
    }
);

// Селектор для проверки, заполнена ли строка полностью
export const selectIsRowComplete = createSelector(
    [selectColors, selectActiveRow],
    (colors, rowIndex) => {
        return [0, 1, 2, 3].every(colIndex => {
            const key = `${rowIndex}-${colIndex}`;
            return Boolean(colors[key]);
        });
    }
);
