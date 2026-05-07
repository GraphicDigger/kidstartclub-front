import type { Course } from '../../types';

export const createCourse = (input: Partial<Course>): Course => ({
  id: input.id ?? crypto.randomUUID(),
  title: input.title ?? 'New Course',
  subtitle: input.subtitle ?? '',
  description: input.description ?? '',
  category_slug: input.category_slug ?? '',
  subcategory_slug: input.subcategory_slug ?? '',
  date_start: input.date_start,
  date_end: input.date_end,
  month: input.month ?? '',
  time: input.time ?? '',
  cover: input.cover ?? '',
  ...input,
});
