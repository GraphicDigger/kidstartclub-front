import type { Course } from '../types';

const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL ?? process.env.DJANGO_API_URL ?? 'http://127.0.0.1:8000';

function mediaUrl(path: string | null): string | undefined {
    if (!path) return undefined;
    if (path.startsWith('http')) return path;
    return `${API_URL}${path}`;
}

interface ApiGalleryImage {
    cover: string | null;
    image: string | null;
    position: number;
}

interface ApiCourse {
    id: number;
    title: string;
    subtitle: string;
    slug: string;
    description: string | null;
    cover: string | null;
    category_slug: string;
    subcategory_slug: string;
    age: string;
    date_start: string | null;
    date_end: string | null;
    month: string;
    time: string;
    color: string;
    full_description?: string | null;
    value?: string;
    skill?: string;
    gallery?: ApiGalleryImage[];
}

function mapApiCourse(apiCourse: ApiCourse): Course {
    return {
        id: apiCourse.slug,
        title: apiCourse.title,
        subtitle: apiCourse.subtitle,
        description: apiCourse.description ?? '',
        cover: mediaUrl(apiCourse.cover) ?? '',
        age: apiCourse.age,
        date_start: apiCourse.date_start ?? undefined,
        date_end: apiCourse.date_end ?? undefined,
        month: apiCourse.month,
        time: apiCourse.time,
        color: apiCourse.color,
        category_slug: apiCourse.category_slug,
        subcategory_slug: apiCourse.subcategory_slug,
        content: apiCourse.full_description ?? undefined,
        skill: apiCourse.skill,
        value: apiCourse.value,
        gallery: apiCourse.gallery?.map(g => ({
            cover: mediaUrl(g.cover) ?? undefined,
            image: mediaUrl(g.image) ?? undefined,
            position: g.position,
        })),
    };
}

export async function getCourses(): Promise<Course[]> {
    try {
        const res = await fetch(`${API_URL}/api/courses`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) return [];

        const data = await res.json();
        const apiCourses: ApiCourse[] = data.items ?? [];

        return apiCourses.map(mapApiCourse);
    } catch {
        return [];
    }
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
    try {
        const res = await fetch(`${API_URL}/api/courses/${slug}`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) return undefined;

        const apiCourse: ApiCourse = await res.json();
        return mapApiCourse(apiCourse);
    } catch {
        return undefined;
    }
}
