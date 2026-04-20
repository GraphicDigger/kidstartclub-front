// entities/lesson/model/store/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import lessonSlice from './slice';
import lessonUiStateSlice from './sliceUI';
import * as reducers from './slice';
import * as uiStateReducers from './sliceUI';
import * as selectors from './selectors';

export const lessonReducer = combineReducers({
    lesson: lessonSlice,
    lessonUIState: lessonUiStateSlice,
});

export const lessonSelectors = {
    ...selectors,
};

export const lessonReducers = {
    ...reducers,
};

export const lessonUIStateReducers = {
    ...uiStateReducers,
};
