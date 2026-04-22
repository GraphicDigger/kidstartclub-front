'use client'
import React from "react";
import { Card } from "@/shared/uiKit/Card";
import { lessons } from "@/entities/lesson/api/lesson.data";
import { Stack } from "@/shared/uiKit/Stack";
import { Grid } from "@/shared/uiKit/Grid";
import { Dialog, DialogTrigger, DialogContent } from "@/shared/uiKit/Dialog";
import { Scroll } from "@/shared/uiKit/Scroll";
import { RichText } from "@/shared/uiKit/RichText";
import { Hero } from "@/widgets/Hero";
import { Typography } from "@/shared/uiKit/Typography";
import { Button } from "@/shared/uiKit/Button";
import { BottomSlot } from "@/shared/uiKit/Card/BottomSlot";

export const PostGrid = () => {

  return (
    <>
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
            columns={4}
            gap={6}
            minCol={250}
            autoFit
          >
            {lessons.map((lesson) => (
              <React.Fragment key={lesson.id}>
                <Dialog>
                  <DialogTrigger asChild >
                    <Card
                      height="fit"
                      imageSrc={lesson.image}
                      imageAlt=""
                      description={lesson.description}
                      frame={false}
                      imageFixed={false}
                    />
                  </DialogTrigger>
                  <DialogContent fullscreen>
                    <Scroll>
                      <HeroBlock lesson={lesson} />
                      <Stack>
                        <Stack
                          maxWidth={800}
                          height='fit'
                          alignY="start"
                          paddingTop="5%"
                          paddingBottom="5%"
                          paddingLeft={4}
                          paddingRight={4}
                        >
                          {lesson.lesson && (
                            <RichText dangerouslySetInnerHTML={{ __html: lesson.lesson }} />
                          )}
                        </Stack>
                      </Stack>
                    </Scroll>
                  </DialogContent>
                </Dialog>
              </React.Fragment>
            ))}
          </Grid>
        </Stack>
      </Stack>

    </>

  );
}

const HeroBlock = ({ lesson }: { lesson: any }) => {
  return (

    <Hero
      src={lesson.mood}
      alt=""
    >
      <Card
        maxWidth={520}
        imageSrc={lesson.image}
        imageAlt=""
        imageFixed
        aspectRatio={2}
        subtitle={lesson.author}
        title={lesson.name}
        description={lesson.description}
        imageBgColor={lesson.color}
      >
        <BottomSlot>
          <Stack
            direction="row"
            gap={2}
            alignX="between"
            alignY="center"
            height="fit"
          >
            <Typography
              variant="body.small"
              tag="span"
            > {lesson.date + ' - ' + lesson.time}
            </Typography>
            <Button
              variant="filled"
              color="primary"
              size="small"
              onClick={() => { }}
            > Записаться
            </Button>
          </Stack>
        </BottomSlot>
      </Card>
    </Hero>

  );
}

