import { Hero } from "@/widgets/Hero";
import { CourseCard } from "@/widgets/CourseCard";
import { Stack } from "@/shared/uiKit/Stack";
import { RichText, RichTextColumns } from "@/shared/uiKit/RichText";
import type { Course } from "@/entities/course/types";

interface BookSinglepageProps {
    course: Course;
}

export const BookSinglepage = ({ course }: BookSinglepageProps) => {
    return (
        <>
            <Hero src={course.mood ?? ''} alt="">
                <CourseCard
                    course={course}
                    maxWidth={520}
                    height="fit"
                />
            </Hero>

            <Stack backgroundColor='#F4EBFF'>
                <Stack
                    maxWidth={1000}
                    height="fit"
                    alignY="start"
                    paddingTop="5%"
                    paddingBottom="5%"
                    paddingLeft={4}
                    paddingRight={4}
                >
                    {course.about && (
                        <RichTextColumns html={course.about} />
                    )}
                </Stack>
            </Stack>

            <Stack>
                <Stack
                    maxWidth={800}
                    height="fit"
                    alignY="start"
                    paddingTop="5%"
                    paddingBottom="5%"
                    paddingLeft={4}
                    paddingRight={4}
                >
                    {course.content && (
                        <RichText dangerouslySetInnerHTML={{ __html: course.content }} />
                    )}
                </Stack>
            </Stack>
        </>
    );
};
