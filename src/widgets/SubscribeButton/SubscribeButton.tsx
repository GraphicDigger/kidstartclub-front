'use client'
import { Stack } from "@/shared/uiKit/Stack";
import { Button } from "@/shared/uiKit/Button";
import { Typography } from "@/shared/uiKit/Typography";
import { Dialog, DialogTrigger, DialogContent } from "@/shared/uiKit/Dialog";

interface SubscribeButtonProps {
    label?: string;
    title?: string;
    description?: string;
    size?: 'small' | 'medium' | 'large';
}

export const SubscribeButton = ({
    label = 'Записаться',
    title = 'Запись на занятие',
    description = 'Заглушка формы записи',
    size = 'small',
}: SubscribeButtonProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="filled" color="primary" size={size}>{label}</Button>
            </DialogTrigger>
            <DialogContent>
                <Stack padding={4} gap={2}>
                    <Typography variant="headline.medium">{title}</Typography>
                    <Typography variant="body.medium">{description}</Typography>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};
