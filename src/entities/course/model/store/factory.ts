// entities/course/model/store/factory.ts
import type { Course } from '../../types';

export const createCourse = (input: Partial<Course>): Course => ({
  id: input.id ?? crypto.randomUUID(),
  author: input.author ?? '',
  name: input.name ?? 'New Course',
  description: input.description ?? '',
  date_start: input.date_start,
  date_end: input.date_end,
  month: input.month ?? '',
  time: input.time ?? '',
  cover: input.cover ?? '',
  ...input,
});
