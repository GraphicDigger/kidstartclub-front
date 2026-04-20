// entities/lesson/model/store/factory.ts
import { v4 as uuidv4 } from 'uuid';
import type { Lesson } from '../../types';

export const createLesson = (input: Partial<Lesson>): Lesson => ({
  id: input.id ?? uuidv4(),
  name: input.name ?? 'New Lesson',
});
