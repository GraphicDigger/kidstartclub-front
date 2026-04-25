import { Course } from '../../types';
import { useRepository } from '@/shared/services/dataAccess';
import { createCourse } from '../store/factory';

export const useCourseMutation = () => {
  const repo = useRepository();

  const addCourse = (input: Partial<Course>) => {
    const course = createCourse(input);
    repo.courses.addCourse(course);
  };

  const updateCourse = (course: Course) => {
    repo.courses.updateCourse(course);
  };

  const deleteCourse = (courseId: Course['id']) => {
    repo.courses.removeCourse(courseId);
  };

  return {
    addCourse,
    updateCourse,
    deleteCourse,
  };
};
