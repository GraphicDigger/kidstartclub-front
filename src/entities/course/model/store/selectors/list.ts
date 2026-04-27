// entities/course/model/store/selectors/list.ts
type RootState = any;
import { createSelector } from '@reduxjs/toolkit';
import { selectAllCourses, selectCourseEntities } from './base';

export const selectCoursesByIds = createSelector(
    [selectCourseEntities, (_: RootState, ids: string[]) => ids],
    (entities, ids) => ids.map((id) => entities[id]!),
);
