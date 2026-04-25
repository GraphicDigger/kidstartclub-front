import { ListItem, ListItemButton, ListItemText } from '../../../shared/uiKit/List';
import { useCourse } from '../model';
import { forwardRef } from 'react';

export const CourseListItem = forwardRef(({ onClick, course }, ref) => {

    const name = course.name;
    
    const {
        isCourseFocused,
        isCourseSelected,
        handleCourseHover,
        handleCourseFocus,
        handleCourseSelect,
    } = useCourse(course.id);

    const handleClick = (id) => {
        handleCourseSelect(id);
        onClick && onClick();
    };

    return (
        <ListItem>
            <ListItemButton
                ref={ref}
                isSelected={isCourseSelected}
                isFocused={isCourseFocused}
                onClick={() => handleClick(course.id)}
                onMouseEnter={() => handleCourseHover(course.id)}
                onMouseLeave={() => handleCourseHover(null)}
                onFocus={() => handleCourseFocus(course.id)}
                onBlur={() => handleCourseFocus(null)}
            >
                <ListItemText>{name}</ListItemText>
            </ListItemButton>
        </ListItem>
    );
});









