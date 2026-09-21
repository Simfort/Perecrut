import { useState } from "react";

import styles from "./CalendarBlock.module.css";
import { useVacancy } from "@/entities/vacancies/lib/store/useVacancy";

interface CalendarBlockProps {
  time: [string, string];
  index: number;
}

export const CalendarBlock = ({ time, index }: CalendarBlockProps) => {
  const { setVacancy, vacancy } = useVacancy();
  const handleClick = () => {
    const color = localStorage.getItem("color");
    if (!time[1] || time[1] === color) {
      const newVacancyTimes = [...vacancy!.times];
      console.log(time[1], localStorage.getItem("color"));
      newVacancyTimes[index] = {
        [time[0]]: color === time[1] ? "" : color || "",
      };
      const newVacancies = {
        ...vacancy!,
        times: newVacancyTimes,
      };
      setVacancy(newVacancies);
    }
  };
  return (
    <div
      style={{ backgroundColor: time[1] }}
      onClick={handleClick}
      className={styles.calendar_block}
    ></div>
  );
};
