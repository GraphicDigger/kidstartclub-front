import { notFound } from "next/navigation";
import { Header } from "@/widgets/Header";
import { BookSinglepage } from "@/widgets/BookSinglepage";
import { getCourseBySlug, getCourses } from "@/entities/course/api/course.api";

export default async function CoursePage({ params }) {
  const { id } = await params;
  const [course, allCourses] = await Promise.all([
    getCourseBySlug(id),
    getCourses(),
  ]);
  if (!course) notFound();

  return (
    <>
      <Header />
      <BookSinglepage course={course} allCourses={allCourses} />
    </>
  );
}
