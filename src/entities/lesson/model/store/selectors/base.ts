// entities/lesson/model/store/selectors/base.ts
import type { RootState } from '@/app/store';
import { lessonAdapter } from '../slice';

const selectLessonAdapterState = (state: RootState) =>
  state.lesson?.lesson ?? lessonAdapter.getInitialState();

export const selectLessonState = (state: RootState) => state.lesson;

export const {
    selectEntities: selectLessonEntities,
    selectIds: selectLessonIds,
    selectAll: selectAllLessons,
    selectById: selectLessonById,
    selectTotal: selectTotalLessons,
} = lessonAdapter.getSelectors<RootState>(selectLessonAdapterState);

export const selectHoveredLessonId = (state: RootState) =>
  (selectLessonState(state) as any)?.lessonUIState?.hoveredId;
export const selectFocusedLessonId = (state: RootState) =>
  (selectLessonState(state) as any)?.lessonUIState?.focusedId;
export const selectSelectedLessonId = (state: RootState) =>
  (selectLessonState(state) as any)?.lessonUIState?.selectedId;

export const selectIsLessonSelected = (state: RootState, id: string) => selectSelectedLessonId(state) === id;
export const selectIsLessonFocused = (state: RootState, id: string) => selectFocusedLessonId(state) === id;
export const selectIsLessonHovered = (state: RootState, id: string) => selectHoveredLessonId(state) === id;
