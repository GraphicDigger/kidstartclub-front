import { Header } from "@/widgets/Header";
import { Stack } from "@/shared/uiKit/Stack";
import { Typography } from "@/shared/uiKit/Typography";

export default function CareerPage() {
  return (
    <>
      <Header />
      <Stack
        height="fit"
        alignX="center"
        alignY="center"
        paddingTop="10%"
        paddingBottom="10%"
      >
        <Typography variant="headline.medium">Профориентация</Typography>
        <Typography variant="body.medium">Скоро здесь появится информация</Typography>
      </Stack>
    </>
  );
}
