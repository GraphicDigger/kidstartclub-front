import Link from "next/link";
import { Card } from "@/shared/uiKit/Card";
import { Stack } from "@/shared/uiKit/Stack";
import { Grid } from "@/shared/uiKit/Grid";
import { courses } from "@/entities/course/api/course.data";
import { Header } from "@/widgets/Header";
import { getPast } from "@/shared/lib";

export default function BookClub() {

  const pastCourses = getPast(courses);

  return (
    <>
      <Header />
      <Stack
        paddingTop="5%"
        paddingBottom="5%"
        paddingLeft="16px"
        paddingRight="16px"
      >
        <Stack maxWidth="1200px">
          <Grid
            container
            columns={4}
            gap={6}
            minCol={250}
            autoFit
          >
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
          </Grid>
        </Stack>
      </Stack>
    </>
  );
}
