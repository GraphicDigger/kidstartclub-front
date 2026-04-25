import { notFound } from "next/navigation";
import { courses } from "@/entities/course/api/course.data";
import { Header } from "@/widgets/Header";
import { BookSinglepage } from "@/widgets/BookSinglepage";

export function generateStaticParams() {
  return courses.map((l) => ({ id: l.id }));
}

export default async function CoursePage({ params }) {
  const { id } = await params;
  const course = courses.find((l) => l.id === id);
  if (!course) notFound();

  return (
    <>
      <Header />
      <BookSinglepage course={course} />
    </>
  );
}
