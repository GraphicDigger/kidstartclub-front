import { useSelector } from 'react-redux';
import { useRepository } from '@/shared/services/dataAccess';

interface Props {
  id?: string;
  ids?: string[];
}

export const useCourseSelectors = (params: Props = {}) => {
  const repo = useRepository();

  const allCourses = useSelector(repo.courses.queries.allCourses());
  const selectedCourse = useSelector(repo.courses.queries.selectedCourse());
  const courseById = params.id ? useSelector(repo.courses.queries.byId(params.id)) : undefined;
  const courseByIds = params.ids ? useSelector(repo.courses.queries.byIds(params.ids)) : [];

  return {
    allCourses,
    selectedCourse,
    courseById,
    courseByIds,
  };
};
