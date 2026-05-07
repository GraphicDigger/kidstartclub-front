'use client'
import React from "react";
import Link from "next/link";
import { Card } from "@/shared/uiKit/Card";
import { Stack } from "@/shared/uiKit/Stack";
import { BottomSlot } from "@/shared/uiKit/Card";
import { Typography } from "@/shared/uiKit/Typography";
import { SubscribeButton } from "@/widgets/SubscribeButton";
import type { CourseCategory } from "../types";


interface CourseCategoryCardProps {
    courseCategory: CourseCategory;
    href?: string;
    imagePriority?: boolean;
    [key: string]: any;
}

export const CourseCategoryCard = ({ courseCategory, href, imagePriority, ...props }: CourseCategoryCardProps) => {

    const card = (
        <Card
            key={courseCategory.id}
            height="fill"
            imageSrc={courseCategory.cover}
            imageAlt=""
            title={courseCategory.name}
            description={courseCategory.description}
            imageBgColor={courseCategory.color}
            imagePriority={imagePriority}
            {...props}
        >
            <BottomSlot>
                <Stack
                    direction="row"
                    gap={2}
                    alignX="between"
                    alignY="center"
                    height="fill"
                >
                    <Typography variant="body.small">{courseCategory.age}</Typography>
                    <SubscribeButton label="Подробнее" size="small" />
                </Stack>
            </BottomSlot>
        </Card>
    );

    if (!href) return card;

    return (
        <Link
            href={href}
            style={{ display: 'contents' }}
            onClick={(e) => {
                if ((e.target as HTMLElement).closest('button')) e.preventDefault();
            }}
        >
            {card}
        </Link>
    );
}
