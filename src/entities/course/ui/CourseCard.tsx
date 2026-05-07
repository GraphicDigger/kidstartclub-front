'use client'
import React from "react";
import Link from "next/link";
import { Card } from "@/shared/uiKit/Card";
import { Stack } from "@/shared/uiKit/Stack";
import { BottomSlot } from "@/shared/uiKit/Card";
import { Typography } from "@/shared/uiKit/Typography";
import { SubscribeButton } from "@/widgets/SubscribeButton";
import { isPast } from "@/shared/lib";


interface CourseCardProps {
    course: any;
    href?: string;
    imagePriority?: boolean;
    [key: string]: any;
}

export const CourseCard = ({ course, href, imagePriority, ...props }: CourseCardProps) => {

    const past = isPast(course.date_end, course.date_start);

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
            {!past && (
                <BottomSlot>
                    <Stack
                        direction="row"
                        gap={2}
                        alignX="between"
                        alignY="center"
                        height="fit"
                    >
                        <Typography variant="body.small">{course.date + ' • ' + course.time}</Typography>
                        <SubscribeButton />
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
            onClick={(e) => {
                if ((e.target as HTMLElement).closest('button')) e.preventDefault();
            }}
        >
            {card}
        </Link>
    );
}
