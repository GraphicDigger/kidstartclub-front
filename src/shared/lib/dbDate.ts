export interface WithDbDate {
    db_date?: string;
}

export function getUpcoming<T extends WithDbDate>(items: T[], today: string = new Date().toISOString().slice(0, 10)): T[] {
    return items
        .filter((item): item is T & { db_date: string } => Boolean(item.db_date) && item.db_date! >= today)
        .sort((a, b) => a.db_date.localeCompare(b.db_date));
}

export function getPast<T extends WithDbDate>(items: T[], today: string = new Date().toISOString().slice(0, 10)): T[] {
    return items
        .filter((item): item is T & { db_date: string } => Boolean(item.db_date) && item.db_date! < today)
        .sort((a, b) => b.db_date.localeCompare(a.db_date));
}

export function isPast(dbDate: string | undefined, today: string = new Date().toISOString().slice(0, 10)): boolean {
    return Boolean(dbDate) && dbDate! < today;
}
