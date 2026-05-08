import { Header } from "@/widgets/Header";
import { Stack } from "@/shared/uiKit/Stack";
import { Typography } from "@/shared/uiKit/Typography";
import { ServiceHero } from "@/widgets/ServiceHero";

export default function CareerPage() {
  return (
    <>
      <Header />
      <ServiceHero
        title="Профориентация"
        description="Группа мальчиков оказывается на необитаемом острове после авиакатастрофы. Сначала они пытаются создать порядок: выбирают лидера, договариваются о правилах, поддерживают огонь как сигнал спасения. Постепенно страх и борьба за власть разрушают эту систему. Возникает «зверь» — нечто, чего никто не видел, но во что начинают верить."
        alt="Book Club Hero"
      />
    </>
  );
}
