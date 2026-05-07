export const COURSE_CATEGORIES = {
  BOOK_CLUB: 'book-club',
  CAREER: 'career',
} as const;
export type CourseCategoryKind = typeof COURSE_CATEGORIES[keyof typeof COURSE_CATEGORIES];

export const COURSE_CATEGORY_LABELS: Record<CourseCategoryKind, string> = {
  'book-club': 'Книжный клуб',
  'career': 'Профориентация',
};

export const BOOK_CLUB_COURSE_SUBCATEGORY = {
  NONE_FICTION: 'none-fiction',
  FICTION: 'fiction',
} as const;
export type BookClubCourseSubcategory = typeof BOOK_CLUB_COURSE_SUBCATEGORY[keyof typeof BOOK_CLUB_COURSE_SUBCATEGORY];

export const COURSE_SUBCATEGORY_LABELS: Record<BookClubCourseSubcategory, string> = {
  'none-fiction': 'Нон-фикшн',
  'fiction': 'Художественная литература',
};

export const CAREER_COURSE_SUBCATEGORY = {
  GROUP: 'group',
  INDIVIDUAL: 'individual',
} as const;
export type CareerCourseSubcategory = typeof CAREER_COURSE_SUBCATEGORY[keyof typeof CAREER_COURSE_SUBCATEGORY];

export const CAREER_COURSE_SUBCATEGORY_LABELS: Record<CareerCourseSubcategory, string> = {
  group: 'Групповое занятие',
  individual: 'Индивидуальное занятие',
};
