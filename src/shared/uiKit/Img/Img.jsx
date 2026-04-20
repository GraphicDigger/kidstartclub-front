'use client'

import React, { memo, useRef } from 'react';
import { useImageFit } from './model';
import styles from './Img.module.scss';

export const Img = memo(({
    src,
    alt,
    width,
    height,
    fill = false,
    aspectRatio,
    objectFit = 'cover',
    autoFit = false, // cover or contain
    objectPosition = 'center',
    className,
    ...props
}) => {
    const imageRef = useRef(null);
    const coverOrContain = useImageFit(imageRef, src, objectFit, autoFit);


    const imgFillContainerStyle = {
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
    }

    const imgFillStyle = {
        objectFit: coverOrContain,
        objectPosition: objectPosition,
    }
    const imgStyle = {
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        objectFit: coverOrContain,
        objectPosition: objectPosition,
    }

    if (fill) {
        return (
            <div
                className={styles.imgFillContainer}
                style={imgFillContainerStyle}
            >
                <img
                    className={styles.imgFill}
                    style={imgFillStyle}
                    src={src}
                    alt={alt}
                    ref={imageRef}
                    {...props}
                />
            </div>
        );
    }

    return (
        <img
            className={styles.img}
            style={imgStyle}
            src={src}
            alt={alt}
            ref={imageRef}
            {...props}
        />
    );
});


Img.displayName = 'Img';