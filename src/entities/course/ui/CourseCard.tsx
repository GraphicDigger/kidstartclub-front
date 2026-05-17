'use client'
import React from "react";
import Link from "next/link";
import { Card } from "@/shared/uiKit/Card";
import { Stack } from "@/shared/uiKit/Stack";
import { BottomSlot } from "@/shared/uiKit/Card";
import { Typography } from "@/shared/uiKit/Typography";
import { SubscribeButton } from "@/widgets/SubscribeButton";

import { Button } from "@/shared/uiKit/Button";


interface CourseCardProps {
    course: any;
    href?: string;
    imagePriority?: boolean;
    isPast?: boolean
    [key: string]: any;
}

export const CourseCard = ({ course, href, imagePriority, isPast, ...props }: CourseCardProps) => {

    const card = (
        <Card
            key={course.id}
            height="fill"
            imageSrc={course.cover}
            imageAlt=""
            subtitle={
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: 8 }}>
                    <span>{course.subtitle}</span>
                    {course.age && <span>{course.age}</span>}
                </span>
            }
            title={course.title}
            description={course.description}
            imageBgColor={course.color}
            imagePriority={imagePriority}
            {...props}
        >
            {!isPast && (
                <BottomSlot>
                    <Stack
                        direction="row"
                        gap={2}
                        alignX="between"
                        alignY="center"
                        height="fit"
                    >
                        <Typography variant="body.small">{course.month}</Typography>
                        {/* <Typography variant="body.small">{course.month + ' • ' + course.time}</Typography> */}
                        {href && <Button size="medium">Подробнее</Button>}
                    </Stack>
                </BottomSlot>
            )}
        </Card>
    );

    if (!href) return card;

    return (
        <Link
            href={href}
            style={{ display: 'contents' }}
        >
            {card}
        </Link>
    );
}
