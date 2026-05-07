import type { EntityState } from '@reduxjs/toolkit';
export type { CourseCategoryKind, BookClubCourseSubcategory, CareerCourseSubcategory } from '@/shared/const';
export { COURSE_CATEGORIES, COURSE_CATEGORY_LABELS, BOOK_CLUB_COURSE_SUBCATEGORY, COURSE_SUBCATEGORY_LABELS, CAREER_COURSE_SUBCATEGORY, CAREER_COURSE_SUBCATEGORY_LABELS } from '@/shared/const';

import type { CourseCategoryKind, BookClubCourseSubcategory, CareerCourseSubcategory } from '@/shared/const';

export type CourseSubcategory =
  | BookClubCourseSubcategory
  | CareerCourseSubcategory;

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover: string;
}

export interface CourseCategory {
  id: string;
  kind: CourseCategoryKind;
  type: CourseSubcategory;
  name: string;
  age?: string;
  description: string;
  color?: string;
  cover: string;
}

export interface CourseCategoryUIState {
    hoveredId: string | null;
    focusedId: string | null;
    selectedId: string | null;
}

export interface CourseCategoryState extends EntityState<CourseCategory, string>, CourseCategoryUIState { }

export interface CourseCategoryIdPayload {
    id: string | null;
}
