import React from "react";
import { courses } from "@/entities/course/api/course.data";
import { Hero } from "@/widgets/Hero";
import { Header } from "@/widgets/Header";
import { CourseCard } from "@/widgets/CourseCard";
import { getUpcoming } from "@/shared/lib";
import { Grid } from "@/shared/uiKit/Grid";
import { Stack } from "@/shared/uiKit/Stack";


export default function Home() {

  const upcoming = getUpcoming(courses);
  const currentCourse = upcoming[0];
  const otherCourses = upcoming.slice(1, 4);

  return (
    <>
      <Header />

      <Hero
        key={currentCourse.id}
        src={currentCourse.mood}
        alt=""
        title="Клуб Читателей"
        subtitle="Где подростки пытаются понять и осмыслить себя через книги"
      >
        <CourseCard
          course={currentCourse}
          href={`/book-club/${currentCourse.id}`}
          maxWidth={520}
          height='fit'
        />
      </Hero>

      <Container>
        <Grid
          container
          columns={3}
          gap={6}
          minCol={300}
          autoFit
        >
          {otherCourses.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              href={`/book-club/${c.id}`}
              maxWidth={520}
            />
          ))}
        </Grid >
      </Container>
    </>
  );
}

const Container = ({ children }) => {
  return (
    <Stack    >
      <Stack
        maxWidth={1200}
        height="fit"
        alignY="start"
        alignX="start"
        gap={7}
        paddingTop="5%"
        paddingBottom="5%"
        paddingLeft={4}
        paddingRight={4}
      >
        {children}
      </Stack>
    </Stack>

  )
}
