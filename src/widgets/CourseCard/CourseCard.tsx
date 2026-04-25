'use client'
import React from "react";
import Link from "next/link";
import { Card } from "@/shared/uiKit/Card";
import { Stack } from "@/shared/uiKit/Stack";
import { BottomSlot } from "@/shared/uiKit/Card";
import { Button } from "@/shared/uiKit/Button";
import { Typography } from "@/shared/uiKit/Typography";
import { Dialog, DialogTrigger, DialogContent } from "@/shared/uiKit/Dialog";
import { isPast } from "@/shared/lib";


export const CourseCard = ({ course, href, ...props }: { course: any; href?: string }) => {

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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="filled" color="primary" size="small">Записаться</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <Stack padding={4} gap={2}>
                                    <Typography variant="headline.medium">Запись на занятие</Typography>
                                    <Typography variant="body.medium">Заглушка формы записи</Typography>
                                </Stack>
                            </DialogContent>
                        </Dialog>
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
