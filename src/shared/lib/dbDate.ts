export interface WithDbDate {
    date_start?: string;
    date_end?: string;
}

export function getUpcoming<T extends WithDbDate>(items: T[], now: Date = new Date()): T[] {
    return items
        .filter((item) => {
            if (!item.date_start) return false;
            const end = item.date_end ?? item.date_start;
            return new Date(end) >= now;
        })
        .sort((a, b) => new Date(a.date_start!).getTime() - new Date(b.date_start!).getTime());
}

export function getPast<T extends WithDbDate>(items: T[], now: Date = new Date()): T[] {
    return items
        .filter((item) => {
            if (!item.date_start) return false;
            const end = item.date_end ?? item.date_start;
            return new Date(end) < now;
        })
        .sort((a, b) => new Date(b.date_start!).getTime() - new Date(a.date_start!).getTime());
}

export function isPast(date_end?: string, date_start?: string, now: Date = new Date()): boolean {
    if (!date_start) return false;
    const end = date_end ?? date_start;
    return new Date(end) < now;
}
