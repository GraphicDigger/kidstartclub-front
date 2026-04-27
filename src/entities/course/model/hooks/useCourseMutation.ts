import { Course } from '../../types';

export const useCourseMutation = () => {
  const addCourse = (_input: Partial<Course>) => {};
  const updateCourse = (_course: Course) => {};
  const deleteCourse = (_courseId: Course['id']) => {};

  return {
    addCourse,
    updateCourse,
    deleteCourse,
  };
};
