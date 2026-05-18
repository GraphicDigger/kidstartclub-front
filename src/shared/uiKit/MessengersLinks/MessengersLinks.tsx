'use client';

import React, { memo } from 'react';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { TelegramButton } from './TelegramButton';
import { WhatsAppButton } from './WhatsAppButton';


interface MessengersLinksProps {
    telegramUrl?: string;
    whatsAppUrl?: string;
    title?: string;
    className?: string;
    border?: boolean;
}

export const MessengersLinks = memo(({
    telegramUrl,
    whatsAppUrl,
    title = 'Записаться',
    className,
    border = true,
}: MessengersLinksProps) => {

    return (
        <Stack
            direction="row"
            alignX="between"
            alignY="center"
            paddingLeft={4}
            width="fill"
            height={60}
            className={className}
            style={{
                borderRadius: "9999px",
                // border: "2px solid #1D9FE0",
                backgroundColor: "white",
                paddingLeft: "24px"

            }}
        >
            <Typography variant="body.medium">
                {title}
            </Typography>

            <Stack
                direction="row"
                gap={2}
                maxWidth={250}
                style={{ color: "white", padding: "8px" }}
            >
                <TelegramButton url={telegramUrl} />
                <WhatsAppButton url={whatsAppUrl} />
            </Stack>
        </Stack>
    );
});

MessengersLinks.displayName = 'MessengersLinks';
