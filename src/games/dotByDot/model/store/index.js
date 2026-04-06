import { combineReducers } from '@reduxjs/toolkit';
import dotSlice from './slice';
import modeSlice from './sliceMode';

export const dotByDotReducer = combineReducers({
    dots: dotSlice,
    modes: modeSlice,
  });

export * from './slice';
export * from './selectors';
export * from './sliceMode';