import { auth } from "@/entities/recruters/server";

import { redirect } from "next/navigation";
import styles from "./VacanciesPage.module.css";
import { getAll } from "@/entities/vacancies/server";
import { Suspense } from "react";

import { Header, VacanciesContainer } from "@/widgets";

export const VacanciesPage = async () => {
  const authorized = await auth();
  if (!authorized) redirect("/signup");
  const vacancies = getAll(authorized.token);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Suspense fallback="loading">
          <VacanciesContainer promise={vacancies} />
        </Suspense>
      </main>
    </div>
  );
};
