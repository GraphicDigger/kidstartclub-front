import Link from 'next/link';
import { Button } from '@/shared/uiKit/Button';
import { Stack } from '@/shared/uiKit/Stack';

export interface Tab {
    label: string;
    value: string;
    href: string;
}

interface TabsProps {
    tabs: Tab[];
    activeValue?: string;
}

export const Tabs = ({ tabs, activeValue }: TabsProps) => {
    return (
        <Stack
            direction="row"
            gap={2}
            alignY="center"
            height="fit"
            width="fit"
        >
            {tabs.map((tab) => (
                <Link key={tab.value} href={tab.href} style={{ display: 'contents' }}>
                    <Button color={activeValue === tab.value ? 'primary' : 'default'}>
                        {tab.label}
                    </Button>
                </Link>
            ))}
        </Stack>
    );
};
