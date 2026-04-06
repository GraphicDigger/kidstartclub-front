

export const cleanedStyle = (style) => {
    return Object.fromEntries(
        Object.entries(style).filter(([_, value]) => value !== undefined)
    );
};