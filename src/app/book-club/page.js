import Link from "next/link";
import { Card } from "@/shared/uiKit/Card";
import { Stack } from "@/shared/uiKit/Stack";
import { Typography } from "@/shared/uiKit/Typography";
import { TelegramButton } from "@/shared/uiKit/MessengersLinks";
import { Grid } from "@/shared/uiKit/Grid";
import { Header } from "@/widgets/Header";
import { ServiceHero } from "@/widgets/ServiceHero";
import { BookClubTabs } from "@/widgets/BookClubTabs";
import { getPast, getUpcoming } from "@/shared/lib";
import { CourseCard } from "@/entities/course";
import { getCourses } from "@/entities/course/api/course.api";
import { getSubcategories } from "@/entities/course_subcategory";
import { COURSE_CATEGORIES } from "@/shared/const";

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
        alt={activeTab.name}
        style={{ marginBottom: "16px" }}
      />
      <BookClubTabs tabs={tabs} activeValue={subcategory || COURSE_CATEGORIES.BOOK_CLUB} />
      <Stack >
        <Container>
          {upcoming.length !== 0
            ?
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
            :
            <Stack
              direction="row"
              gap={4}
              style={{ border: "1px solid #1D9FE0", padding: "32px", borderRadius: "16px", color: "#1D9FE0" }}
            >
              Подпишитесь, чтобы получать анонсы книг
              <TelegramButton height={40} width={150} />
            </Stack>
          }
        </Container>
        {pastCourses.length !== 0 &&
          <Container>
            <Container style={{ padding: "0", marginTop: "16px" }}>
              <Typography
                variant="headline.small"
                tag="p"
              >
                Архив прочитанного
              </Typography>
            </Container>
            <Grid
              container
              columns={4}
              gap={6}
              minCol={250}
              autoFill
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
        }
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

