import { useSelector } from 'react-redux';
import { useRepository } from '@/shared/services/dataAccess';

interface Props {
  id?: string;
  ids?: string[];
}

export const useLessonSelectors = (params: Props = {}) => {
  const repo = useRepository();

  const allLessons = useSelector(repo.lessons.queries.allLessons());
  const selectedLesson = useSelector(repo.lessons.queries.selectedLesson());
  const lessonById = params.id ? useSelector(repo.lessons.queries.byId(params.id)) : undefined;
  const lessonByIds = params.ids ? useSelector(repo.lessons.queries.byIds(params.ids)) : [];

  return {
    allLessons,
    selectedLesson,
    lessonById,
    lessonByIds,
  };
};
