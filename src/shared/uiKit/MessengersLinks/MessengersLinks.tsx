'use client';

import React, { memo } from 'react';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { TelegramIcon, WhatsAppIcon } from '../../icons';
import Link from "next/link";


interface MessengersLinksProps {
    telegramUrl?: string;
    whatsAppUrl?: string;
    title?: string;
    className?: string;
    border?: boolean;
}

export const MessengersLinks = memo(({
    telegramUrl = 'https://t.me/kidstartclub',
    whatsAppUrl = 'https://wa.me/79000000000',
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
                <Link href={telegramUrl} target="_blank" style={{ width: "100%", height: "100%" }}>
                    <Stack
                        backgroundColor="#1D9FE0"
                        width="fill"
                        style={{ borderRadius: "999px" }}
                    >
                        <TelegramIcon size="24" color="#FFFFFF" />
                    </Stack>

                </Link>
                <Link
                    href={whatsAppUrl}
                    target="_blank"
                    style={{ width: "100%", height: "100%" }}
                >
                    <Stack
                        backgroundColor="#42BD46"
                        width="fill"
                        style={{ borderRadius: "999px", }}
                    >
                        <WhatsAppIcon size="24" color="#FFFFFF" />
                    </Stack>
                </Link>
            </Stack>
        </Stack>
    );
});

MessengersLinks.displayName = 'MessengersLinks';
