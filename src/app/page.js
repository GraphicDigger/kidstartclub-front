import React from "react";
import { courses } from "@/entities/course/api/course.data";
import { Hero } from "@/widgets/Hero";
import { Header } from "@/widgets/Header";
import { CourseCard } from "@/widgets/CourseCard";
import { getUpcoming } from "@/shared/lib";


export default function Home() {

  const upcoming = getUpcoming(courses);
  // const currentCourse = upcoming[0];
  // const courses = upcoming.slice(1, 5);

  return (
    <>
      <Header />
      {upcoming.map((c, index) => (
        <React.Fragment key={c.id}>
          <Hero
            key={c.id}
            src={c.mood}
            alt=""
            title={index === 0 ? "Клуб Читателей" : undefined}
            subtitle={index === 0 ? "Где подростки пытаются понять и осмыслить себя через книги" : undefined}
          >
            <CourseCard
              course={c}
              href={`/book-club/${c.id}`}
              maxWidth={520}
              height='fit'
            />
          </Hero>
        </React.Fragment>
      ))}
    </>
  );
}
