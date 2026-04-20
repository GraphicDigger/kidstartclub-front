// entities/lesson/model/store/slice.ts
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { Lesson } from '../../types';
import type { PayloadAction } from '@reduxjs/toolkit';

export const lessonAdapter = createEntityAdapter<Lesson>();

type LessonExtraState = {
  loading: boolean;
  error: string | null;
};

export const initialState = lessonAdapter.getInitialState<LessonExtraState>({
  loading: false,
  error: null,
});

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {

    lessonsLoading(state) {
      state.loading = true;
      state.error = null;
    },

    lessonsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    setLessons(state, action: PayloadAction<Lesson[]>) {
      lessonAdapter.setAll(state, action.payload);
    },
    addLesson(state, action: PayloadAction<Lesson>) {
      lessonAdapter.addOne(state, action.payload);
    },

    updateLesson(state, action: PayloadAction<Lesson>) {
      lessonAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },

    removeLesson(state, action: PayloadAction<string>) {
      lessonAdapter.removeOne(state, action.payload);
    },
  },
});

export const {
  setLessons,
  lessonsLoading,
  lessonsError,
  addLesson,
  updateLesson,
  removeLesson,
} = lessonSlice.actions;

export default lessonSlice.reducer;
