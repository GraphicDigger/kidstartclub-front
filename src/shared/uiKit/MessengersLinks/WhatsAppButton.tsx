import React, { memo } from 'react';
import Link from 'next/link';
import { Stack } from '../Stack';
import { WhatsAppIcon } from '../../icons';

interface WhatsAppButtonProps {
    url?: string;
    width?: 'fill' | 'fit' | number | 'full';
    height?: 'fill' | 'fit' | number | 'full';
}

export const WhatsAppButton = memo(({ 
    url = 'https://wa.me/79000000000',
    width = 'fill',
    height = 'fill'
}: WhatsAppButtonProps) => {

    const getDimension = (dim: 'fill' | 'fit' | number | 'full') => {
        if (typeof dim === 'number') return `${dim}px`;
        if (dim === 'fill') return '100%';
        if (dim === 'full') return '100%';
        return dim;
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
                backgroundColor="#42BD46"
                width={width}
                height={height}
                style={{ borderRadius: "999px" }}
            >
                <WhatsAppIcon size="24" color="#FFFFFF" />
            </Stack>
        </Link>
    );
});

WhatsAppButton.displayName = 'WhatsAppButton';
