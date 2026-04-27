import { Hero } from "@/widgets/Hero";
import { CourseCard } from "@/widgets/CourseCard";
import { Stack } from "@/shared/uiKit/Stack";
import { RichText, RichTextColumns } from "@/shared/uiKit/RichText";
import type { Course } from "@/entities/course/types";
import { Grid } from "@/shared/uiKit/Grid";
import { Typography } from "@/shared/uiKit/Typography";
import { courses } from "@/entities/course/api/course.data";
import { getUpcoming } from "@/shared/lib";
import { Divider } from "@/shared/uiKit/Divider";
import { SubscribeButton } from "@/widgets/SubscribeButton";


const how_work = '<h3>Ищем символы</h3><p>Раковина, огонь, «зверь», голова свиньи — это не детали сюжета, а смысловые опоры. Подросток учится видеть, что за предметом стоит идея.</p><h3>Читаем между строк</h3><p>Мы обсуждаем не только «что произошло», но и «почему автор это показывает именно так».</p><h3>Связываем с контекстом автора</h3><p>Разбираем, когда Уильям Голдинг написал роман и почему тема распада общества была для него важна (опыт войны, наблюдение за людьми).</p><h3>Разбираем героев как людей</h3><p>Даже в жёстких персонажах ищем человеческие черты: страх, желание быть принятым, стремление к власти.</p><h3>Учимся видеть метафоры</h3><p>«Зверь» — это не существо, а образ. Подросток начинает отличать буквальный уровень от смыслового.</p><h3>Соотносим с собой</h3><p>Главный вопрос: «А как бы я повёл себя в этой ситуации?» Это переводит книгу из теории в личный опыт.</p>';


interface BookSinglepageProps {
    course: Course;
}

export const BookSinglepage = ({ course }: BookSinglepageProps) => {

    const upcomingCourses = getUpcoming(courses);

    return (
        <>
            <Hero src={course.mood ?? ''} alt="">
                <CourseCard
                    course={course}
                    maxWidth={520}
                    height="fit"
                />
            </Hero>

            <Container>
                <Grid
                    container
                    columns={2}
                    gap={10}
                    minCol={300}
                    autoFit
                >
                    <Stack
                        height="fit"
                        alignY="start"
                        alignX="start"
                        gap={4}
                    >
                        <Typography variant="headline.small"> О книге </Typography>
                        {course.about && (
                            <RichText dangerouslySetInnerHTML={{ __html: course.about }} />
                        )}
                    </Stack>
                    <Stack
                        height="fit"
                        alignY="start"
                        alignX="start"
                        gap={4}
                    >
                        <Typography variant="headline.small"> Ценность для подростка </Typography>
                        {course.value && (
                            <RichText dangerouslySetInnerHTML={{ __html: course.value }} />
                        )}
                    </Stack>
                </Grid>
            </Container>

            <Container color='#F4EBFF'>
                <Typography tag="h2" variant="headline.medium">
                    Чему учит книга «{course.name}»
                </Typography>
                <Typography variant="body.medium">
                    Книга дает материал для размышлений, а не готовые ответы
                </Typography>
                {course.skill && (
                    <RichTextColumns html={course.skill} splitOn="h3" minColWidth={200} />
                )}
            </Container>

            <Container>
                <Typography variant="headline.medium">
                    Как разбираем книги
                </Typography>
                <Typography variant="body.medium">
                    Книга не просто история, а инструментом мышления
                </Typography>
                {how_work && (
                    <RichTextColumns html={how_work} splitOn="h3" minColWidth={250} />
                )}
            </Container>

            <Container divider paddingV="10%" >
                <SubscribeButton label={`Записаться на «${course.name}»`} size="large" />
            </Container>

            <Container color='#F6F6F6'>
                <Typography variant="headline.medium">
                    Другие книги клуба
                </Typography>
                <Typography variant="body.medium">
                    Каждый месяц мы разбираем новую книгу.
                </Typography>
                <Grid
                    container
                    columns={3}
                    gap={6}
                    minCol={300}
                    autoFill
                >
                    {upcomingCourses.map((c) => (
                        <CourseCard
                            key={c.id}
                            course={c}
                            href={`/book-club/${c.id}`}
                            maxWidth={520}
                        />
                    ))}
                </Grid>
            </Container>

        </>
    );
};


const Container = ({
    children,
    color,
    divider = false,
    paddingV = '5%',
}) => {
    return (
        <Stack backgroundColor={color} >
            {divider && <Divider orientation='horizontal' top />}
            <Stack
                maxWidth={1000}
                height="fit"
                alignY="start"
                alignX="start"
                gap={8}
                paddingTop={paddingV}
                paddingBottom={paddingV}
                paddingLeft={4}
                paddingRight={4}
            >
                {children}
            </Stack>
        </Stack>

    )
}
