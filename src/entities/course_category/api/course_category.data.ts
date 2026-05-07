import type { CourseCategory } from '../types';
import {
    COURSE_CATEGORIES,
    BOOK_CLUB_COURSE_SUBCATEGORY,
    CAREER_COURSE_SUBCATEGORY,
    CAREER_COURSE_SUBCATEGORY_LABELS,
} from '../types';

export const courseCategories: CourseCategory[] = [
    {
        id: 'book-club-fiction',
        kind: COURSE_CATEGORIES.BOOK_CLUB,
        type: BOOK_CLUB_COURSE_SUBCATEGORY.FICTION,
        name: 'Чтение художественной литературы',
        age: '10+',
        description: 'О преодолении внутренних барьеров, поиске собственного голоса и умении видеть людей глубже.',
        color: '#FFFFFF',
        cover: '/book-club-fiction.jpg',
    },
    {
        id: 'book-club-none-fiction',
        kind: COURSE_CATEGORIES.BOOK_CLUB,
        type: BOOK_CLUB_COURSE_SUBCATEGORY.NONE_FICTION,
        name: 'Чтение статей и эссе',
        age: '10+',
        description: 'О втором шансе, потере памяти и возможности переписать свою биографию с чистого листа.',
        color: '#FFFFFF',
        cover: '/book-club-none-fiction.jpg',
    },
    {
        id: 'career-individual',
        kind: COURSE_CATEGORIES.CAREER,
        type: CAREER_COURSE_SUBCATEGORY.INDIVIDUAL,
        name: CAREER_COURSE_SUBCATEGORY_LABELS.individual,
        age: '14+',
        description: 'О втором шансе, потере памяти и возможности переписать свою биографию с чистого листа.',
        color: '#FFFFFF',
        cover: '/career_group.jpg',
    },
    {
        id: 'career-group',
        kind: COURSE_CATEGORIES.CAREER,
        type: CAREER_COURSE_SUBCATEGORY.GROUP,
        name: CAREER_COURSE_SUBCATEGORY_LABELS.group,
        age: '14+',
        description: 'О преодолении внутренних барьеров, поиске собственного голоса и умении видеть людей глубже.',
        color: '#FFFFFF',
        cover: '/career_group.jpg',
    },
];
