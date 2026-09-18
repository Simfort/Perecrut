import { VacancyPage } from "./ui/VacancyPage";

export default function Page({ params }: PageProps<"/vacancies/[vacancyId]">) {
  return <VacancyPage params={params} />;
}
