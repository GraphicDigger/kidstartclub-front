import { Lesson } from '../../types';
import { useRepository } from '@/shared/services/dataAccess';
import { createLesson } from '../store/factory';

export const useLessonMutation = () => {
  const repo = useRepository();

  const addLesson = (input: Partial<Lesson>) => {
    const lesson = createLesson(input);
    repo.lessons.addLesson(lesson);
  };

  const updateLesson = (lesson: Lesson) => {
    repo.lessons.updateLesson(lesson);
  };

  const deleteLesson = (lessonId: Lesson['id']) => {
    repo.lessons.removeLesson(lessonId);
  };

  return {
    addLesson,
    updateLesson,
    deleteLesson,
  };
};
