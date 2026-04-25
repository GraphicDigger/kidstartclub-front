// entities/course/model/store/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import courseSlice from './slice';
import courseUiStateSlice from './sliceUI';
import * as reducers from './slice';
import * as uiStateReducers from './sliceUI';
import * as selectors from './selectors';

export const courseReducer = combineReducers({
    course: courseSlice,
    courseUIState: courseUiStateSlice,
});

export const courseSelectors = {
    ...selectors,
};

export const courseReducers = {
    ...reducers,
};

export const courseUIStateReducers = {
    ...uiStateReducers,
};
