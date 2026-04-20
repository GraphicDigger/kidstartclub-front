// entities/lesson/model/store/selectors/list.ts
import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import { selectAllLessons, selectLessonEntities } from './base';

export const selectLessonsByIds = createSelector(
    [selectLessonEntities, (_: RootState, ids: string[]) => ids],
    (entities, ids) => ids.map((id) => entities[id]!),
);
