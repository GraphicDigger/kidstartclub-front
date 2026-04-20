import { ListItem, ListItemButton, ListItemText } from '../../../shared/uiKit/List';
import { useLesson } from '../model';
import { forwardRef } from 'react';

export const LessonListItem = forwardRef(({ onClick, lesson }, ref) => {

    const name = lesson.name;
    
    const {
        isLessonFocused,
        isLessonSelected,
        handleLessonHover,
        handleLessonFocus,
        handleLessonSelect,
    } = useLesson(lesson.id);

    const handleClick = (id) => {
        handleLessonSelect(id);
        onClick && onClick();
    };

    return (
        <ListItem>
            <ListItemButton
                ref={ref}
                isSelected={isLessonSelected}
                isFocused={isLessonFocused}
                onClick={() => handleClick(lesson.id)}
                onMouseEnter={() => handleLessonHover(lesson.id)}
                onMouseLeave={() => handleLessonHover(null)}
                onFocus={() => handleLessonFocus(lesson.id)}
                onBlur={() => handleLessonFocus(null)}
            >
                <ListItemText>{name}</ListItemText>
            </ListItemButton>
        </ListItem>
    );
});









