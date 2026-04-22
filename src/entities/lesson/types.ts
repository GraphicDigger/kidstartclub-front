import type { EntityState } from '@reduxjs/toolkit';

// Entity Schema
export interface Lesson {
    id: string;
    author: string;
    name: string;
    description: string;
    date: string;
    time: string;
    image: string;
    about?: string;
    lesson?: string;
    mood?: string;
    color?: string;
}

// Redux State Schemas

// Состояние UI-взаимодействий (фокус, выбор и т.д.)
export interface LessonUIState {
    hoveredId: string | null;
    focusedId: string | null;
    selectedId: string | null;
}

// Объединяет в себе нормализованные данные и состояние UI
export interface LessonState extends EntityState<Lesson, string>, LessonUIState {}

// Полезная нагрузка для экшенов, работающих с ID
export interface LessonIdPayload {
    id: string | null;
} 