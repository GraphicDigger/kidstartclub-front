import type { EntityState } from '@reduxjs/toolkit';

// Entity Schema
export interface Course {
    id: string;
    author: string;
    name: string;
    description: string;
    date: string;
    time: string;
    image: string;
    about?: string;
    value?: string;
    content?: string;
    mood?: string;
    color?: string;
    db_date?: string;
    skill?: string;
    age?: string;
}

// Redux State Schemas

// Состояние UI-взаимодействий (фокус, выбор и т.д.)
export interface CourseUIState {
    hoveredId: string | null;
    focusedId: string | null;
    selectedId: string | null;
}

// Объединяет в себе нормализованные данные и состояние UI
export interface CourseState extends EntityState<Course, string>, CourseUIState {}

// Полезная нагрузка для экшенов, работающих с ID
export interface CourseIdPayload {
    id: string | null;
} 