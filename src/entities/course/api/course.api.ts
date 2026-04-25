import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Course } from '../types';
import { courses as mockCourses } from './course.data';
import { setCourses } from '../model/store/slice';

// после создания
// 1. добавить selectors и redusers в shared/services/dataAccess/repositories
// 2. init
// - через провайдер app/providers/DataInitProvider
// - в app/store

// RTK Query API для courses
export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Course'],
  endpoints: (builder) => ({
    // GET все courses
    getCourses: builder.query<Course[], void>({
      queryFn: async () => {
        await new Promise(res => setTimeout(res, 100));
        return { data: mockCourses };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Course' as const, id })),
              { type: 'Course', id: 'LIST' },
            ]
          : [{ type: 'Course', id: 'LIST' }],
      // Синхронизация с Redux slice после успешной загрузки
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCourses(data));
        } catch {
          // Ошибка обрабатывается в RTK Query
        }
      },
    }),

    // GET один course по id
    getCourseById: builder.query<Course, string>({
      queryFn: async (id) => {
        await new Promise(res => setTimeout(res, 50));
        const item = mockCourses.find(c => c.id === id);
        if (item) {
          return { data: item };
        }
        return { error: { status: 404, data: 'Course not found' } };
      },
      providesTags: (_result, _error, id) => [{ type: 'Course', id }],
    }),
  }),
});

// Автоматически сгенерированные хуки
export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useLazyGetCoursesQuery,
  usePrefetch,
} = courseApi;
