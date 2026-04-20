import { Typography } from "@/shared/uiKit/Typography";
import { Card } from "@/shared/uiKit/Card";
import { lessons } from "@/entities/lesson/api/lesson.data";
import { Stack } from "@/shared/uiKit/Stack";
import { Grid } from "@/shared/uiKit/Grid";
import { Hero } from "@/widgets/Hero";
import { Header } from "@/widgets/Header";
import { PostGrid } from "@/widgets/PostGrid";

export default function BookClub() {

  return (
    <>
      <Header />
      <PostGrid />
    </>

  );
}
