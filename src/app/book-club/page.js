import Link from "next/link";
import { Card } from "@/shared/uiKit/Card";
import { Stack } from "@/shared/uiKit/Stack";
import { Grid } from "@/shared/uiKit/Grid";
import { Tabs } from "@/shared/uiKit/Tabs";
import { Header } from "@/widgets/Header";
import { ServiceHero } from "@/widgets/ServiceHero";
import { getPast, getUpcoming } from "@/shared/lib";
import { CourseCard } from "@/entities/course";
import { getCourses } from "@/entities/course/api/course.api";
import { getSubcategories } from "@/entities/course_subcategory";
import { COURSE_CATEGORIES } from "@/shared/const";
import { ScrollArea } from "@/shared/uiKit/ScrollArea";

export default async function BookClub({ searchParams }) {

  const { subcategory } = await searchParams;
  const [courses, subcategories] = await Promise.all([getCourses(), getSubcategories()]);

  const bookClubSubs = subcategories.filter((s) => s.category_slug === COURSE_CATEGORIES.BOOK_CLUB);

  const tabs = [
    {
      label: "Все",
      value: COURSE_CATEGORIES.BOOK_CLUB,
      href: `/${COURSE_CATEGORIES.BOOK_CLUB}`,
      name: "Клуб мыслителей",
      description: "Группа мальчиков оказывается на необитаемом острове после авиакатастрофы. Сначала они пытаются создать порядок: выбирают лидера, договариваются о правилах, поддерживают огонь как сигнал спасения. Постепенно страх и борьба за власть разрушают эту систему. Возникает «зверь» — нечто, чего никто не видел, но во что начинают верить."
    },
    ...bookClubSubs.map((s) => ({
      label: s.name,
      value: s.slug,
      name: s.name,
      description: s.description,
      href: `/${COURSE_CATEGORIES.BOOK_CLUB}?subcategory=${s.slug}`,
      src: s.cover
    }))
  ];

  const activeTab = tabs.find((t) => t.value === (subcategory || COURSE_CATEGORIES.BOOK_CLUB)) || tabs[0];

  const filtered = subcategory
    ? courses.filter((c) => c.subcategory_slug === subcategory)
    : courses;

  const pastCourses = getPast(filtered);
  const upcoming = getUpcoming(filtered);

  return (
    <>
      <Header />
      <ServiceHero
        title={activeTab.name}
        description={activeTab.description}
        // src={activeTab.src}
        alt={activeTab.name}
      />
      <ScrollArea orientation="horizontal">
        <Stack height="fill" paddingTop={4}>
          <Container>
            <Tabs tabs={tabs} activeValue={subcategory || COURSE_CATEGORIES.BOOK_CLUB} />
          </Container>
        </Stack>
      </ScrollArea>
      <Stack >
        <Container>
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

const Container = ({ children, ...props }) => {
  return (
    <Stack
      maxWidth={1200}
      height="fit"
      alignY="start"
      alignX="start"
      gap={7}
      padding={4}
      {...props}
    >
      {children}
    </Stack >
  )
}
