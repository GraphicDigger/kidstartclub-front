import { useSelector } from 'react-redux';
import { useRepository } from '@/shared/services/dataAccess';

interface Props {
  courseId?: string;
}

export const useUIStates = (params: Props = {}) => {
  const repo = useRepository();

  const isCourseSelected = useSelector(repo.courses.queries.isCourseSelected(params.courseId ?? ''));
  const isCourseFocused = useSelector(repo.courses.queries.isCourseFocused(params.courseId ?? ''));
  const isCourseHovered = useSelector(repo.courses.queries.isCourseHovered(params.courseId ?? ''));

  const handleCourseHover = (id: string | null) => {
    repo.courses.setHoveredCourseId(id);
  };

  const handleCourseFocus = (id: string | null) => {
    repo.courses.setFocusedCourseId(id);
  };

  const handleCourseSelect = (id: string | null) => {
    repo.courses.setSelectedCourseId(id);
  };

  return {
    isCourseHovered,
    isCourseFocused,
    isCourseSelected,
    handleCourseHover,
    handleCourseFocus,
    handleCourseSelect,
  };
};
