import { getCourseBySlug } from "@/entities/course/api/course.api";
import CourseModalDialog from "./CourseModalDialog";

export default async function CourseModal({ params }) {
  const { id } = await params;
  const course = await getCourseBySlug(id);
  if (!course) return null;

  return <CourseModalDialog course={course} id={id} />;
}
