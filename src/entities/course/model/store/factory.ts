// entities/course/model/store/factory.ts
import { v4 as uuidv4 } from 'uuid';
import type { Course } from '../../types';

export const createCourse = (input: Partial<Course>): Course => ({
  id: input.id ?? uuidv4(),
  name: input.name ?? 'New Course',
});
