import { useSelector } from 'react-redux';
import { useRepository } from '@/shared/services/dataAccess';

interface Props {
  lessonId?: string;
}

export const useUIStates = (params: Props = {}) => {
  const repo = useRepository();

  const isLessonSelected = useSelector(repo.lessons.queries.isLessonSelected(params.lessonId ?? ''));
  const isLessonFocused = useSelector(repo.lessons.queries.isLessonFocused(params.lessonId ?? ''));
  const isLessonHovered = useSelector(repo.lessons.queries.isLessonHovered(params.lessonId ?? ''));

  const handleLessonHover = (id: string | null) => {
    repo.lessons.setHoveredLessonId(id);
  };

  const handleLessonFocus = (id: string | null) => {
    repo.lessons.setFocusedLessonId(id);
  };

  const handleLessonSelect = (id: string | null) => {
    repo.lessons.setSelectedLessonId(id);
  };

  return {
    isLessonHovered,
    isLessonFocused,
    isLessonSelected,
    handleLessonHover,
    handleLessonFocus,
    handleLessonSelect,
  };
};
