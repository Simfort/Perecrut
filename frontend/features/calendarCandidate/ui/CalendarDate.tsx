import { ArrowLeft, ArrowRight } from "lucide-react";

import { useVacancy, VacancyFormattedParsed } from "@/entities/vacancies";
import { getIntervalsHours } from "@/shared/utils/getInterevalsHours";
import styles from "./CalendarDate.module.css";
import { useDate } from "@/shared/lib/store/useDate";

export const CalendarDate = () => {
  const { date, setDate } = useDate();
  const { setVacancy, vacancy } = useVacancy();
  const handleNextMonth = () => {
    const nextDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    );
    const nextDateString = nextDate.toDateString();
    const nextTimes = vacancy?.times[nextDateString];
    if (!nextTimes) {
      const newData = {
        ...vacancy?.times,
        [nextDateString]: getIntervalsHours(30).map((time) => ({
          [time]: "",
        })),
      };
      console.log(newData);
      setVacancy({ ...vacancy, times: newData } as VacancyFormattedParsed);
    }
    setDate(nextDate);
  };
  const handleBackMonth = () => {
    const nextDate = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      date.getDate(),
    );
    const nextDateString = nextDate.toDateString();
    const nextTimes = vacancy?.times[nextDateString];
    if (!nextTimes) {
      const newData = {
        ...vacancy?.times,
        [nextDateString]: getIntervalsHours(30).map((time) => ({
          [time]: "",
        })),
      };
      console.log(newData);
      setVacancy({ ...vacancy, times: newData } as VacancyFormattedParsed);
    }
    setDate(nextDate);
  };
  return (
    <div className={styles.date}>
      {" "}
      <button onClick={handleBackMonth}>
        <ArrowLeft size={20} />
      </button>
      <div>{date.toDateString()}</div>{" "}
      <button onClick={handleNextMonth}>
        <ArrowRight size={20} />
      </button>
    </div>
  );
};
