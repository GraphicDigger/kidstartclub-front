'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/shared/uiKit/Dialog";
import { Scroll } from "@/shared/uiKit/Scroll";
import { BookSinglepage } from "@/widgets/BookSinglepage";

export default function CourseModalDialog({ course, id }) {
  const router = useRouter();

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
