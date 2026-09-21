import { redirect } from "next/navigation";
import styles from "./VacancyPage.module.css";
import { getVacancy } from "@/entities/vacancies/server";
import { auth } from "@/entities/recruters/server";
import { Suspense } from "react";
import { Vacancy } from "@/widgets/vacancy";

interface VacancyPageProps {
  params: Promise<{ vacancyId: string }>;
}

export const VacancyPage = async ({ params }: VacancyPageProps) => {
  const vacancyId = (await params).vacancyId;
  const authorized = await auth();
  if (!authorized) redirect("/signup");
  const vacancy = getVacancy(vacancyId);
  return (
    <div className={styles.page}>
      <Suspense fallback={"loading"}>
        <Vacancy promise={vacancy} />
      </Suspense>
    </div>
  );
};
