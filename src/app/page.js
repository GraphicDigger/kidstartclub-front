import React from "react";
import { getCategories } from "@/entities/course_category";
import { getSubcategories, CourseSubcategoryCard } from "@/entities/course_subcategory";
import { Hero } from "@/widgets/Hero";
import { Header } from "@/widgets/Header";
import { Grid } from "@/shared/uiKit/Grid";
import { Stack } from "@/shared/uiKit/Stack";


export default async function Home() {

  const [categories, subcategories] = await Promise.all([getCategories(), getSubcategories()]);

  return (
    <>
      <Header />

      {categories.map((category) => {
        const subs = subcategories.filter((s) => s.category_slug === category.slug);
        return (
          <Hero key={category.id} src={category.cover} alt="" title={category.name}>
            <Container>
              <Grid container columns={3} gap={6} minCol={300} autoFit equalRows>
                {subs.map((sub) => (
                  <CourseSubcategoryCard
                    key={sub.id}
                    subcategory={sub}
                    href={`/${category.slug}?subcategory=${sub.slug}`}
                    maxWidth={520}
                  />
                ))}
              </Grid>
            </Container>
          </Hero>
        );
      })}

    </>
  );
}

const Container = ({ children }) => {
  return (
    <Stack>
      <Stack
        maxWidth={800}
        height="fit"
        alignY="start"
        alignX="start"
        gap={7}
        paddingLeft={4}
        paddingRight={4}
      >
        {children}
      </Stack>
    </Stack>
  )
}
