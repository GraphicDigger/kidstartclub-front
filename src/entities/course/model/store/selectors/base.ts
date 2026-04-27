// entities/course/model/store/selectors/base.ts
type RootState = any;
import { courseAdapter } from '../slice';

const selectCourseAdapterState = (state: RootState) =>
  state.course?.course ?? courseAdapter.getInitialState();

export const selectCourseState = (state: RootState) => state.course;

export const {
    selectEntities: selectCourseEntities,
    selectIds: selectCourseIds,
    selectAll: selectAllCourses,
    selectById: selectCourseById,
    selectTotal: selectTotalCourses,
} = courseAdapter.getSelectors<RootState>(selectCourseAdapterState);

export const selectHoveredCourseId = (state: RootState) =>
  (selectCourseState(state) as any)?.courseUIState?.hoveredId;
export const selectFocusedCourseId = (state: RootState) =>
  (selectCourseState(state) as any)?.courseUIState?.focusedId;
export const selectSelectedCourseId = (state: RootState) =>
  (selectCourseState(state) as any)?.courseUIState?.selectedId;

export const selectIsCourseSelected = (state: RootState, id: string) => selectSelectedCourseId(state) === id;
export const selectIsCourseFocused = (state: RootState, id: string) => selectFocusedCourseId(state) === id;
export const selectIsCourseHovered = (state: RootState, id: string) => selectHoveredCourseId(state) === id;
