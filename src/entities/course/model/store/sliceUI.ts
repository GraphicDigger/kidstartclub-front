// entities/course/model/store/sliceUI.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CourseUIState } from '../../types';

const initialState: CourseUIState = {
    hoveredId: null,
    focusedId: null,
    selectedId: null,
};

const courseUiStateSlice = createSlice({
    name: 'courseUIState',
    initialState,
    reducers: {
        setHoveredCourseId(state, action: PayloadAction<string | null>) {
            state.hoveredId = action.payload;
        },
        setSelectedCourseId(state, action: PayloadAction<string | null>) {
            state.selectedId = action.payload;
        },
        setFocusedCourseId(state, action: PayloadAction<string | null>) {
            state.focusedId = action.payload;
        },
    },
});

export const {
    setHoveredCourseId,
    setSelectedCourseId,
    setFocusedCourseId,
} = courseUiStateSlice.actions;

export default courseUiStateSlice.reducer;
