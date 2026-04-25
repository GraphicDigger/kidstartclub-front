'use client'
import React from "react";
import { Stack } from "@/shared/uiKit/Stack";
import { Grid } from "@/shared/uiKit/Grid";

interface CardGridProps {
    children: React.ReactNode;
    columns?: number;
    minCol?: number;
    gap?: number;
}

export const CardGrid = ({ children, columns = 4, minCol = 250, gap = 6 }: CardGridProps) => {
    return (
        <Stack
            paddingTop="5%"
            paddingBottom="5%"
            paddingLeft="16px"
            paddingRight="16px"
        >
            <Stack maxWidth="1200px">
                <Grid
                    container
                    columns={columns}
                    gap={gap}
                    minCol={minCol}
                    autoFit
                >
                    {children}
                </Grid>
            </Stack>
        </Stack>
    );
}
