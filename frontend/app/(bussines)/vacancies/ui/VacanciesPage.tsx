import { auth } from "@/entities/recruters/server";
import { VacanciesPanel } from "@/widgets/vacanciesPanel/ui/VacanciesPanel";
import { redirect } from "next/navigation";
import styles from "./VacanciesPage.module.css";
import { getAll } from "@/entities/vacancies/server";
import { Suspense } from "react";
import { VacanciesList } from "@/widgets/vacanciesList";

export const VacanciesPage = async () => {
  const authorized = await auth();
  if (!authorized) redirect("/signup");
  const vacancies = getAll(authorized.token);
  return (
    <div className={styles.page}>
      <h1>Hi</h1>
      <VacanciesPanel />
      <Suspense fallback="loading">
        <VacanciesList promise={vacancies} />
      </Suspense>
    </div>
  );
};
