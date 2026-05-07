'use client';
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/shared/uiKit/Dialog";
import { Scroll } from "@/shared/uiKit/Scroll";
import { BookSinglepage } from "@/widgets/BookSinglepage";
import { getCourseBySlug } from "@/entities/course/api/course.api";

export default function CourseModal({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const course = use(getCourseBySlug(id));
  if (!course) return null;

  const handleChange = (open) => {
    if (!open) {
      router.back();
      router.refresh();
    }
  };

  useEffect(() => { router.refresh(); }, []);

  return (
    <Dialog key={id} open onOpenChange={handleChange}>
      <DialogContent fullscreen>
        <Scroll>
          <BookSinglepage course={course} />
        </Scroll>
      </DialogContent>
    </Dialog>
  );
}
