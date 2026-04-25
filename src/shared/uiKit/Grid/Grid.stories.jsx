import React from 'react';
import { Grid } from './Grid';
import { Box } from '../Box';
import styled from '@emotion/styled';
import { Card } from '../Card';
import { courses } from '../../../entities/course/api/course.data';

export default {
    title: 'uiKit/Grid',
    component: Grid,
    argTypes: {
        container: { control: 'boolean' },
        item: { control: 'boolean' },
        spacing: { control: { type: 'range', min: 0, max: 10, step: 1 } },
        columns: { control: { type: 'range', min: 1, max: 24, step: 1 } },
    },
};

const Item = styled(Box)`
    padding: 16px;
    text-align: center;
    border-radius: 4px;
    background-color: #e0e0e0;
    color: #333;
`;

export const GridFill = () => {
    const coursesFill = courses.slice(0, 3);
    return (

        <Grid
            container
            spacing={4}
            columns={3}
            gap={6}
            minCol={280}
            autoFill={true}
        >
            {coursesFill.map((course) => (
                <Grid item size={20}>
                    <Card
                        key={course.id}
                        imageSrc={course.image}
                        imageAlt={course.name}
                        description={course.description}
                        detail={course.date + ' - ' + course.time}
                        actionLabel="Action"
                        height="fill"
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export const GridFit = () => {
    const coursesFit = courses.slice(0, 3);
    return (
        <Grid
            container
            spacing={4}
            columns={3}
            gap={6}
            minCol={280}
            autoFit={true}
        >
            {coursesFit.map((course) => (
                <Grid item size={20}>
                    <Card
                        key={course.id}
                        imageSrc={course.image}
                        imageAlt={course.name}
                        title={course.name}
                        description={course.description}
                        detail={course.date + ' - ' + course.time}
                        actionLabel="Action"
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export const GridColumns = () => {

    return (
        <Grid
            container
            spacing={6}
            columns={4}
            gap={6}
            minCol={230}
        >
            {courses.map((course) => (
                <Grid item size={20}>
                    <Card
                        key={course.id}
                        imageSrc={course.image}
                        imageAlt={course.name}
                        description={course.description}
                        detail={course.date + ' - ' + course.time}
                        actionLabel="Action"
                        frame
                        // frame={false}

                    />
                </Grid>
            ))}
        </Grid>
    );
};

export const DifferentColumns = () => (
    <Grid container spacing={2} columns={16}>
        <Grid item size={8}>
            <Item>size=8 (in 16-column grid)</Item>
        </Grid>
        <Grid item size={8}>
            <Item>size=8 (in 16-column grid)</Item>
        </Grid>
        <Grid item size={4}>
            <Item>size=4 (in 16-column grid)</Item>
        </Grid>
        <Grid item size={4}>
            <Item>size=4 (in 16-column grid)</Item>
        </Grid>
        <Grid item size={4}>
            <Item>size=4 (in 16-column grid)</Item>
        </Grid>
        <Grid item size={4}>
            <Item>size=4 (in 16-column grid)</Item>
        </Grid>
    </Grid>
);

export const SpacingGrid = () => (
    <div>
        <Grid container spacing={1}>
            <Grid item size={3}>
                <Item>spacing=1</Item>
            </Grid>
            <Grid item size={3}>
                <Item>spacing=1</Item>
            </Grid>
            <Grid item size={3}>
                <Item>spacing=1</Item>
            </Grid>
            <Grid item size={3}>
                <Item>spacing=1</Item>
            </Grid>
        </Grid>

        <Grid container spacing={2} css={{ marginTop: '20px' }}>
            <Grid item size={3}>
                <Item>spacing=2</Item>
            </Grid>
            <Grid item size={3}>
                <Item>spacing=2</Item>
            </Grid>
            <Grid item size={3}>
                <Item>spacing=2</Item>
            </Grid>
            <Grid item size={3}>
                <Item>spacing=2</Item>
            </Grid>
        </Grid>

        <Grid container spacing={3} css={{ marginTop: '20px' }}>
            <Grid item size={3}>
                <Item>spacing=3</Item>
            </Grid>
            <Grid item size={3}>
                <Item>spacing=3</Item>
            </Grid>
            <Grid item size={3}>
                <Item>spacing=3</Item>
            </Grid>
            <Grid item size={3}>
                <Item>spacing=3</Item>
            </Grid>
        </Grid>
    </div>
);

export const NestedGrid = () => (
    <Grid container spacing={2}>
        <Grid item size={8}>
            <Item>
                <Grid container spacing={1}>
                    <Grid item size={4}>
                        <Item>Nested 4/12</Item>
                    </Grid>
                    <Grid item size={8}>
                        <Item>Nested 8/12</Item>
                    </Grid>
                </Grid>
            </Item>
        </Grid>
        <Grid item size={4}>
            <Item>4/12</Item>
        </Grid>
    </Grid>
);

export const Interactive = (args) => (
    <Grid container {...args}>
        <Grid item size={4}>
            <Item>Item 1</Item>
        </Grid>
        <Grid item size={4}>
            <Item>Item 2</Item>
        </Grid>
        <Grid item size={4}>
            <Item>Item 3</Item>
        </Grid>
    </Grid>
);

Interactive.args = {
    spacing: 2,
    columns: 12,
};


