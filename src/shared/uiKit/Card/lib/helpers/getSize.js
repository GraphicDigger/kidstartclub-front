export const getHeight = (height) => {
    if (typeof height === 'number') { return `${height}px` }
    if (height === 'fill') { return '100%' }
    if (height === 'fit') { return 'max-content' }
    return height;
}

export const getWidth = (width) => {
    if (typeof width === 'number') { return `${width}px` }
    if (width === 'fill') { return '100%' }
    if (width === 'fit') { return 'max-content' }
    return width;
}
