import { Typography } from "@/shared/uiKit/Typography";
import { Card, TopSlot, BottomSlot } from "@/shared/uiKit/Card";
import { lessons } from "@/entities/lesson/api/lesson.data";
import { Stack } from "@/shared/uiKit/Stack";
import { Grid } from "@/shared/uiKit/Grid";
import { Button } from "@/shared/uiKit/Button";
import { Hero } from "@/widgets/Hero";
import { Header } from "@/widgets/Header";
import { CardGrid } from "@/widgets/CardGrid";


export default function Home() {

  const lesson = lessons[0];

  return (
    <>
      <Header />
      <Hero
        src="/guillermo-ferla-Oze6U2m1oYU-unsplash.jpg"
        alt=""
        title="Клуб Читателей"
        subtitle="Где подростки пытаются понять и осмыслить себя через книги"
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
              <Typography
                variant="body.small"
                tag="span"
              > {lesson.date + ' - ' + lesson.time}
              </Typography>
              <Button
                variant="filled"
                color="primary"
                size="small"
                onClick={() => {}}
              > Записаться
              </Button>
            </Stack>
          </BottomSlot>
        </Card>
      </Hero>

      <CardGrid />
    </>


  );
}
