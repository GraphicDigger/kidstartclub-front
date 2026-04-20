import { Card } from "@/shared/uiKit/Card";
import { lessons } from "@/entities/lesson/api/lesson.data";
import { Stack } from "@/shared/uiKit/Stack";
import { Grid } from "@/shared/uiKit/Grid";
import { BottomSlot } from "@/shared/uiKit/Card/BottomSlot";
import { Button } from "@/shared/uiKit/Button";
import { Typography } from "@/shared/uiKit/Typography";

export const CardGrid = () => {

    const lessonsGrid = lessons.slice(0, 4);

    return (
        <Stack
            paddingTop="5%"
            paddingBottom="5%"
            paddingLeft="16px"
            paddingRight="16px"
        >
            <Stack
                maxWidth="1200px"
            >
                <Grid
                    container
                    columns={3}
                    gap={6}
                    minCol={360}
                    autoFit={true}
                >
                    {lessonsGrid.map((lesson) => (
                        <Card
                            key={lesson.id}
                            height="fill"
                            imageSrc={lesson.image}
                            imageAlt=""
                            subtitle={lesson.author}
                            title={lesson.name}
                            description={lesson.description}
                            detail={lesson.date + ' - ' + lesson.time}
                            actionLabel="Записаться"
                        >
                            <BottomSlot>
                                <Stack
                                    direction="row"
                                    gap={2}
                                    alignX="between"
                                    alignY="center"
                                    height="fit"
                                >
                                    <Typography variant="body.small">{lesson.date + ' - ' + lesson.time}</Typography>
                                    <Button variant="filled" color="primary" size="small">Записаться</Button>
                                </Stack>
                            </BottomSlot>
                        </Card>
                    ))}
                </Grid>
            </Stack>
        </Stack>
    );
}
