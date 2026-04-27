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
    [key: string]: any;
}

export const CourseCard = ({ course, href, ...props }: CourseCardProps) => {

    const past = isPast(course.db_date);

    const card = (
        <Card
            key={course.id}
            height="fill"
            imageSrc={course.image}
            imageAlt=""
            subtitle={
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: 8 }}>
                    <span>{course.author}</span>
                    {course.age && <span>{course.age}</span>}
                </span>
            }
            title={course.name}
            description={course.description}
            imageBgColor={course.color}
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
