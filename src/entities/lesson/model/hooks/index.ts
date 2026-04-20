import { useLessonSelectors } from './useLessonSelectors';
import { useUIStates } from './useUIStates';
import { useLessonMutation } from './useLessonMutation';

export { useLessonSelectors, useLessonMutation, useUIStates };

export interface UseLessonParams {
  id?: string;
  ids?: string[];
  lessonId?: string;
}

export const useLesson = (params: UseLessonParams = {}) => {
  const selectors = useLessonSelectors({ id: params.id, ids: params.ids });
  const uiStates = useUIStates({ lessonId: params.lessonId ?? params.id });
  const mutation = useLessonMutation();

  return {
    ...selectors,
    ...uiStates,
    ...mutation,
  };
};
