import type { EntityState } from '@reduxjs/toolkit';

export interface GalleryImage {
    cover?: string;
    image?: string;
    position: number;
}

export interface Course {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    date_start?: string;
    date_end?: string;
    month: string;
    time: string;
    cover: string;
    category_slug: string;
    subcategory_slug: string;
    value?: string;
    content?: string;
    color?: string;
    skill?: string;
    age?: string;
    gallery?: GalleryImage[];
}

export interface CourseUIState {
    hoveredId: string | null;
    focusedId: string | null;
    selectedId: string | null;
}

export interface CourseState extends EntityState<Course, string>, CourseUIState {}

export interface CourseIdPayload {
    id: string | null;
}
