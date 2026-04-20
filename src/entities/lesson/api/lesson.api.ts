import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Lesson } from '../types';
import { lessons as mockLessons } from './lesson.data';
import { setLessons } from '../model/store/slice';

// после создания
// 1. добавить selectors и redusers в shared/services/dataAccess/repositories
// 2. init
// - через провайдер app/providers/DataInitProvider
// - в app/store

// RTK Query API для lessons
export const lessonApi = createApi({
  reducerPath: 'lessonApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Lesson'],
  endpoints: (builder) => ({
    // GET все lessons
    getLessons: builder.query<Lesson[], void>({
      queryFn: async () => {
        await new Promise(res => setTimeout(res, 100));
        return { data: mockLessons };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Lesson' as const, id })),
              { type: 'Lesson', id: 'LIST' },
            ]
          : [{ type: 'Lesson', id: 'LIST' }],
      // Синхронизация с Redux slice после успешной загрузки
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLessons(data));
        } catch {
          // Ошибка обрабатывается в RTK Query
        }
      },
    }),

    // GET один lesson по id
    getLessonById: builder.query<Lesson, string>({
      queryFn: async (id) => {
        await new Promise(res => setTimeout(res, 50));
        const item = mockLessons.find(c => c.id === id);
        if (item) {
          return { data: item };
        }
        return { error: { status: 404, data: 'Lesson not found' } };
      },
      providesTags: (_result, _error, id) => [{ type: 'Lesson', id }],
    }),
  }),
});

// Автоматически сгенерированные хуки
export const {
  useGetLessonsQuery,
  useGetLessonByIdQuery,
  useLazyGetLessonsQuery,
  usePrefetch,
} = lessonApi;
