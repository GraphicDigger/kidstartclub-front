import type { CourseSubcategory } from '../types';

const API_URL = process.env.DJANGO_API_URL ?? 'http://127.0.0.1:8000';

function mediaUrl(path: string | null): string | undefined {
    if (!path) return undefined;
    if (path.startsWith('http')) return path;
    return `${API_URL}${path}`;
}

interface ApiCourseSubcategory {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    cover: string | null;
    age: string;
    color: string;
    category_slug: string;
}

function mapApiCourseSubcategory(api: ApiCourseSubcategory): CourseSubcategory {
    return {
        id: String(api.id),
        name: api.name,
        slug: api.slug,
        description: api.description ?? '',
        cover: mediaUrl(api.cover) ?? '',
        age: api.age,
        color: api.color,
        category_slug: api.category_slug,
    };
}

export async function getSubcategories(): Promise<CourseSubcategory[]> {
    try {
        const res = await fetch(`${API_URL}/api/courses/subcategories`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) return [];

        const data: ApiCourseSubcategory[] = await res.json();
        return data.map(mapApiCourseSubcategory);
    } catch {
        return [];
    }
}
