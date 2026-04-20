import type { RootState } from '@/app/store';
import { selectSelectedLessonId, selectLessonById } from './base';

export const selectSelectedLesson = (state: RootState) => {
  const selectedId = selectSelectedLessonId(state);
  return selectedId ? selectLessonById(state, selectedId) ?? null : null;
};
