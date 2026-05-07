import type { Category } from '../types';

const API_URL = process.env.DJANGO_API_URL ?? 'http://127.0.0.1:8000';

function mediaUrl(path: string | null): string | undefined {
    if (!path) return undefined;
    if (path.startsWith('http')) return path;
    return `${API_URL}${path}`;
}

interface ApiCategory {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    cover: string | null;
}

function mapApiCategory(api: ApiCategory): Category {
    return {
        id: String(api.id),
        name: api.name,
        slug: api.slug,
        description: api.description ?? '',
        cover: mediaUrl(api.cover) ?? '',
    };
}

export async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${API_URL}/api/courses/categories`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) return [];

        const data: ApiCategory[] = await res.json();
        return data.map(mapApiCategory);
    } catch {
        return [];
    }
}
