import { useCourseSelectors } from './useCourseSelectors';
import { useUIStates } from './useUIStates';
import { useCourseMutation } from './useCourseMutation';

export { useCourseSelectors, useCourseMutation, useUIStates };

export interface UseCourseParams {
  id?: string;
  ids?: string[];
  courseId?: string;
}

export const useCourse = (params: UseCourseParams = {}) => {
  const selectors = useCourseSelectors({ id: params.id, ids: params.ids });
  const uiStates = useUIStates({ courseId: params.courseId ?? params.id });
  const mutation = useCourseMutation();

  return {
    ...selectors,
    ...uiStates,
    ...mutation,
  };
};
