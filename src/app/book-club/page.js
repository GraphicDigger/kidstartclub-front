import Link from "next/link";
import { Card } from "@/shared/uiKit/Card";
import { Stack } from "@/shared/uiKit/Stack";
import { Grid } from "@/shared/uiKit/Grid";
import { Tabs } from "@/shared/uiKit/Tabs";
import { Header } from "@/widgets/Header";
import { getPast, getUpcoming } from "@/shared/lib";
import { CourseCard } from "@/entities/course";
import { getCourses } from "@/entities/course/api/course.api";
import { getSubcategories } from "@/entities/course_subcategory";
import { COURSE_CATEGORIES } from "@/shared/const";

export default async function BookClub({ searchParams }) {

  const { subcategory } = await searchParams;
  const [courses, subcategories] = await Promise.all([getCourses(), getSubcategories()]);

  const bookClubSubs = subcategories.filter((s) => s.category_slug === COURSE_CATEGORIES.BOOK_CLUB);

  const tabs = bookClubSubs.map((s) => ({
    label: s.name,
    value: s.slug,
    href: `/book-club?subcategory=${s.slug}`,
  }));

  const filtered = subcategory
    ? courses.filter((c) => c.subcategory_slug === subcategory)
    : courses;

  const pastCourses = getPast(filtered);
  const upcoming = getUpcoming(filtered);

  return (
    <>
      <Header />
      <Stack
        paddingTop="5%"
        paddingBottom="5%"
        paddingLeft="16px"
        paddingRight="16px"
      >
        <Container>
          <Tabs tabs={tabs} activeValue={subcategory} />
          <Grid
            container
            columns={3}
            gap={6}
            minCol={300}
            autoFit
            equalRows
          >
            {upcoming.map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                href={`/${c.category_slug}/${c.id}`}
                maxWidth={520}
              />
            ))}
          </Grid>
        </Container>
        <Container>
          <Grid
            container
            columns={4}
            gap={6}
            minCol={250}
            autoFit
          >
            {pastCourses.map((course) => (
              <Link key={course.id} href={`/${course.category_slug}/${course.id}`} scroll={false} prefetch={false}>
                <Card
                  height="fit"
                  imageSrc={course.cover}
                  imageAlt=""
                  subtitle={course.title}
                  description={course.description}
                  frame={false}
                  natural
                />
              </Link>
            ))}
          </Grid>
        </Container>
      </Stack>
    </>
  );
}

const Container = ({ children }) => {
  return (
    <Stack
      maxWidth={1200}
      height="fit"
      alignY="start"
      alignX="start"
      gap={7}
      paddingTop="5%"
      paddingBottom="5%"
    >
      {children}
    </Stack>
  )
}
