"use client";
import { useVacancies, VacancyToGetAllFormatted } from "@/entities/vacancies";
import { VacanciesInfoAside } from "./VacanciesInfoAside";
import { use, useEffect } from "react";

import styles from "./VacanciesContainer.module.css";
import { useCurrentContainer } from "../lib/store/useCurrentContainer";
import { CandidatesContainer } from "./CandidatesContainer";
import { JobsContainer } from "./JobsContainer";
import { QuickStats } from "./QuickStats";
import { useCurrentVacancies } from "@/features/jobsPanel";

interface VacanciesContainerProps {
  promise: Promise<VacancyToGetAllFormatted[] | false>;
}

export const VacanciesContainer = ({ promise }: VacanciesContainerProps) => {
  const vacanciesData = use(promise);
  const { setVacancies } = useVacancies();
  const { setCurrentVacancies } = useCurrentVacancies();
  const { current } = useCurrentContainer();
  useEffect(() => {
    if (vacanciesData) {
      setVacancies(vacanciesData);
      setCurrentVacancies(vacanciesData);
    }
  }, [vacanciesData]);
  if (!vacanciesData) return null;
  const Container =
    current === 0
      ? JobsContainer
      : current === 1
        ? CandidatesContainer
        : JobsContainer;
  return (
    <section className={styles.container}>
      <VacanciesInfoAside />
      <Container />
      <QuickStats />
    </section>
  );
};
