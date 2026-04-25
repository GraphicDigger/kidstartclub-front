import Link from "next/link";
import { Card } from "@/shared/uiKit/Card";
import { courses } from "@/entities/course/api/course.data";
import { Header } from "@/widgets/Header";
import { CardGrid } from "@/widgets/CardGrid";
import { getPast } from "@/shared/lib";

export default function BookClub() {

  const pastCourses = getPast(courses);

  return (
    <>
      <Header />
      <CardGrid>
        {pastCourses.map((course) => (
          <Link key={course.id} href={`/book-club/${course.id}`} scroll={false} prefetch={false}>
            <Card
              height="fit"
              imageSrc={course.image}
              imageAlt=""
              subtitle={course.name + ' • ' + course.author}
              description={course.description}
              frame={false}
              imageFixed={false}
            />
          </Link>
        ))}
      </CardGrid>
    </>
  );
}
