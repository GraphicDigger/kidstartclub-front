// entities/course/model/store/factory.ts
import type { Course } from '../../types';

export const createCourse = (input: Partial<Course>): Course => ({
  id: input.id ?? crypto.randomUUID(),
  author: input.author ?? '',
  name: input.name ?? 'New Course',
  description: input.description ?? '',
  date: input.date ?? '',
  time: input.time ?? '',
  image: input.image ?? '',
  ...input,
});
