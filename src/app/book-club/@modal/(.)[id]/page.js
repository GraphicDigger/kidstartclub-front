'use client';
import { use, useEffect } from "react";
import { useRouter, notFound } from "next/navigation";
import { courses } from "@/entities/course/api/course.data";
import { Dialog, DialogContent } from "@/shared/uiKit/Dialog";
import { Scroll } from "@/shared/uiKit/Scroll";
import { BookSinglepage } from "@/widgets/BookSinglepage";

export default function CourseModal({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const course = courses.find((l) => l.id === id);
  if (!course) notFound();

  useEffect(() => { router.refresh(); }, []);

  const handleChange = (open) => {
    if (!open) {
      router.back();
      router.refresh();
    }
  };

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
