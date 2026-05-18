import React, { memo } from 'react';
import Link from 'next/link';
import { Stack } from '../Stack';
import { TelegramIcon } from '../../icons';

interface TelegramButtonProps {
    url?: string;
    width?: 'fill' | 'fit' | number | 'full';
    height?: 'fill' | 'fit' | number | 'full';
}

export const TelegramButton = memo(({ 
    url = 'https://t.me/kidstartclub',
    width = 'fill',
    height = 'fill'
}: TelegramButtonProps) => {

    const getDimension = (dim: 'fill' | 'fit' | number | 'full') => {
        if (typeof dim === 'number') return `${dim}px`;
        if (dim === 'fill') return '100%';
        if (dim === 'full') return '100%'; // Link usually doesn't need 100vw/vh here, 100% is safer
        return dim; // 'fit' -> 'fit-content' or similar might be needed, but 'fit' is used in Stack
    };

    return (
        <Link 
            href={url} 
            target="_blank" 
            style={{ 
                width: getDimension(width), 
                height: getDimension(height) 
            }}
        >
            <Stack
                backgroundColor="#1D9FE0"
                width={width}
                height={height}
                style={{ borderRadius: "999px" }}
            >
                <TelegramIcon size="24" color="#FFFFFF" />
            </Stack>
        </Link>
    );
});

TelegramButton.displayName = 'TelegramButton';
