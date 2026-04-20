// entities/lesson/model/store/sliceUI.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LessonUIState } from '../../types';

const initialState: LessonUIState = {
    hoveredId: null,
    focusedId: null,
    selectedId: null,
};

const lessonUiStateSlice = createSlice({
    name: 'lessonUIState',
    initialState,
    reducers: {
        setHoveredLessonId(state, action: PayloadAction<string | null>) {
            state.hoveredId = action.payload;
        },
        setSelectedLessonId(state, action: PayloadAction<string | null>) {
            state.selectedId = action.payload;
        },
        setFocusedLessonId(state, action: PayloadAction<string | null>) {
            state.focusedId = action.payload;
        },
    },
});

export const {
    setHoveredLessonId,
    setSelectedLessonId,
    setFocusedLessonId,
} = lessonUiStateSlice.actions;

export default lessonUiStateSlice.reducer;
