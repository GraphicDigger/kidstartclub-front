'use client'
import React from "react";
import Link from "next/link";
import { Card } from "@/shared/uiKit/Card";
import { Stack } from "@/shared/uiKit/Stack";
import { BottomSlot } from "@/shared/uiKit/Card";
import { Typography } from "@/shared/uiKit/Typography";
import { SubscribeButton } from "@/widgets/SubscribeButton";
import type { CourseSubcategory } from "../types";

interface CourseSubcategoryCardProps {
    subcategory: CourseSubcategory;
    href?: string;
    imagePriority?: boolean;
    [key: string]: any;
}

export const CourseSubcategoryCard = ({ subcategory, href, imagePriority, ...props }: CourseSubcategoryCardProps) => {

    const card = (
        <Card
            height="fill"
            imageSrc={subcategory.cover}
            imageAlt=""
            title={subcategory.name}
            description={subcategory.description}
            imageBgColor={subcategory.color}
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
