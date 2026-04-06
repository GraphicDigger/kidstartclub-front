import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { COLORS } from '../../const';
import { TOTAL_ROWS } from '../../const';
import {
    selectColors,
    selectCurrentColorIndex,
    selectActiveRow,
    selectTargetColors,
    selectIsGameWon,
    selectIsGameDone,
    selectCellState,
    selectCurrentRowColors,
    selectIsRowComplete,

    setColor,
    resetGame,
    checkAndSetResults
} from '../store';

export const useDots = (cellId) => {
    const dispatch = useDispatch();

    const colors = useSelector(selectColors);
    const targetColors = useSelector(selectTargetColors);
    const currentColorIndex = useSelector(selectCurrentColorIndex);

    const activeRow = useSelector(selectActiveRow);
    const currentRowColors = useSelector(selectCurrentRowColors);
    const isRowComplete = useSelector(selectIsRowComplete);
    
    const isGameWon = useSelector(selectIsGameWon);
    const isGameDone = useSelector(selectIsGameDone);
    const lastRowIndex = TOTAL_ROWS - 1;

    const { color, isDisabled, isActive } = useSelector(
        state => cellId ? selectCellState(state, cellId) : { color: '', isDisabled: false, isActive: false }
    );

    const hasColor = (rowIndex, colIndex) => {
        return !!colors[`${rowIndex}-${colIndex}`]
    }

    // Проверяет, нужно ли показывать результаты для строки
    const shouldShowResults = useCallback((rowIndex) => {
        // Проверяем, есть ли результаты для этой строки
        const hasResults = !!colors[`results-${rowIndex}`];
        
        // Показываем результаты, если:
        // 1. Это не активная строка ИЛИ
        // 2. Есть результаты для этой строки ИЛИ
        // 3. Игра завершена и это была последняя строка
        return activeRow !== rowIndex || hasResults || (isGameDone && rowIndex === 0);
    }, [colors, activeRow, isGameDone]);

    const handleSetColor = useCallback((rowIndex, colIndex) => {
        if (rowIndex !== activeRow) return;
        dispatch(setColor({
            rowIndex,
            colIndex,
            color: COLORS[currentColorIndex]
        }));
    }, [dispatch, activeRow, currentColorIndex]);

    const handleReset = useCallback(() => {
        dispatch(resetGame());
    }, [dispatch]);

    const handleCheckAndSetResults = useCallback(async () => {
        await dispatch(checkAndSetResults());
    }, [dispatch]);


    return {
        colors,
        targetColors,
        currentColorIndex,
        isRowComplete,
        activeRow,

        hasColor,
        shouldShowResults,

        isGameWon,
        isGameDone,
        currentRowColors,

        lastRowIndex,

        cellState: {
            color,
            isDisabled,
            isActive
        },

        setColor: handleSetColor,
        resetGame: handleReset,
        checkAndSetResults: handleCheckAndSetResults,
    };
};

