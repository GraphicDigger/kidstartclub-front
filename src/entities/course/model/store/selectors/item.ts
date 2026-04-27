type RootState = any;
import { selectSelectedCourseId, selectCourseById } from './base';

export const selectSelectedCourse = (state: RootState) => {
  const selectedId = selectSelectedCourseId(state);
  return selectedId ? selectCourseById(state, selectedId) ?? null : null;
};
