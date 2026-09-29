"use client";

import { use, useEffect } from "react";

import { useVacancy } from "../../../entities/vacancies/lib/store/useVacancy";
import { VacancyFormatted } from "@/entities/vacancies";
import { AboutVacancy } from "./AboutVacancy";
import styles from "./Vacancy.module.css";
import { CalendarContainer } from "./CalendarContainer";
import { getIntervalsHours } from "@/shared/utils/getInterevalsHours";

interface VacancyProps {
  promise: Promise<VacancyFormatted | false>;
}

export const Vacancy = ({ promise }: VacancyProps) => {
  const vacancyData = use(promise);
  const { setVacancy } = useVacancy();

  useEffect(() => {
    if (vacancyData) {
      const times = JSON.parse(vacancyData.times);
      const colors = JSON.parse(vacancyData.colors);
      const hasTimes = Object.keys(times).length;
      console.log(hasTimes);
      if (!hasTimes) {
        const newData = {
          [new Date().toDateString()]: getIntervalsHours(30).map((time) => ({
            [time]: "",
          })),
        };
        console.log(newData);
        setVacancy({ ...vacancyData, times: newData, colors });
      } else {
        setVacancy({ ...vacancyData, times, colors });
      }
    }
  }, [vacancyData]);

  if (!vacancyData) return null;

  return (
    <div className={styles.section}>
      <AboutVacancy />
      <CalendarContainer />
    </div>
  );
};
