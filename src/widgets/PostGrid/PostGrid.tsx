import React from "react";
import { Card } from "@/shared/uiKit/Card";
import { lessons } from "@/entities/lesson/api/lesson.data";
import { Stack } from "@/shared/uiKit/Stack";
import { Grid } from "@/shared/uiKit/Grid";
import { Dialog, DialogTrigger, DialogContent } from "@/shared/uiKit/Dialog";
import { Button } from "@/shared/uiKit/Button";

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
                  <DialogTrigger asChild>
                    <Card
                      height="fit"
                      imageSrc={lesson.image}
                      imageAlt=""
                      description={lesson.description}
                      frame={false}
                      imageFixed={false}
                    />
                  </DialogTrigger>
                  <DialogContent></DialogContent>
                </Dialog>
              </React.Fragment>
            ))}
          </Grid>
        </Stack>
      </Stack>

    </>

  );
}
