'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/shared/uiKit/Dialog";
import { ScrollArea } from "@/shared/uiKit/ScrollArea";
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
        <ScrollArea>
          <BookSinglepage course={course} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
