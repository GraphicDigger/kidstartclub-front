import React from 'react';
import { Hero } from '@/shared/uiKit/Hero';
import { Stack } from '@/shared/uiKit/Stack';
import { Typography } from '@/shared/uiKit/Typography';

interface ServiceHeroProps {
    src?: string;
    alt?: string;
    title: string;
    description?: string;
    children?: React.ReactNode;
}

export const ServiceHero = ({
    src,
    alt,
    title,
    description,
    children,
    ...props
}: ServiceHeroProps) => {
    return (
        <Hero
            src={src}
            alt={alt}
            align="left"
            height="fit"
            contentWidth={1200}
        >
            <Stack
                paddingTop="5%"
                paddingBottom="5%"
                width="fill"
                alignX="start"
                gap={6}
                {...props}
            >
                <Typography
                    variant="display.small"
                    tag="h1"
                >
                    {title}
                </Typography>
                {description && (
                    <Stack maxWidth={700}>
                        <Typography
                            variant="body.medium"
                            tag="p"
                        >
                            {description}
                        </Typography>
                    </Stack>
                )}
                {children}
            </Stack>
        </Hero>
    );
};
