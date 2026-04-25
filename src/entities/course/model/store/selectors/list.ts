// entities/course/model/store/selectors/list.ts
import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import { selectAllCourses, selectCourseEntities } from './base';

export const selectCoursesByIds = createSelector(
    [selectCourseEntities, (_: RootState, ids: string[]) => ids],
    (entities, ids) => ids.map((id) => entities[id]!),
);
