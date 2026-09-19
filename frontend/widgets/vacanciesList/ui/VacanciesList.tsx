"use client";
import { Vacancy } from "@/entities/vacancies";
import { use } from "react";
import { VacancyItem } from "./VacancyItem";
import styles from "./vacancies.module.css";

interface VacanciesListProps {
  promise: Promise<Vacancy[] | false>;
}

export const VacanciesList = ({ promise }: VacanciesListProps) => {
  const vacancies = use(promise);

  if (!vacancies) return null;
  return (
    <section className={styles.list}>
      {vacancies.map((val, index) => (
        <VacancyItem key={index} data={val} />
      ))}
    </section>
  );
};
