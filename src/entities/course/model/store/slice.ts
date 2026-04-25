// entities/course/model/store/slice.ts
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { Course } from '../../types';
import type { PayloadAction } from '@reduxjs/toolkit';

export const courseAdapter = createEntityAdapter<Course>();

type CourseExtraState = {
  loading: boolean;
  error: string | null;
};

export const initialState = courseAdapter.getInitialState<CourseExtraState>({
  loading: false,
  error: null,
});

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {

    coursesLoading(state) {
      state.loading = true;
      state.error = null;
    },

    coursesError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    setCourses(state, action: PayloadAction<Course[]>) {
      courseAdapter.setAll(state, action.payload);
    },
    addCourse(state, action: PayloadAction<Course>) {
      courseAdapter.addOne(state, action.payload);
    },

    updateCourse(state, action: PayloadAction<Course>) {
      courseAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },

    removeCourse(state, action: PayloadAction<string>) {
      courseAdapter.removeOne(state, action.payload);
    },
  },
});

export const {
  setCourses,
  coursesLoading,
  coursesError,
  addCourse,
  updateCourse,
  removeCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
