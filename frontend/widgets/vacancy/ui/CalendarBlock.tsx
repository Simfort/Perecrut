import { useState } from "react";
import { useColor } from "../lib/store/useColor";
import styles from "./CalendarBlock.module.css";
import { useVacancy } from "../lib/store/useVacancy";

interface CalendarBlockProps {
  time: [string, string];
  index: number;
}

export const CalendarBlock = ({ time, index }: CalendarBlockProps) => {
  const { currentColor } = useColor();
  const { setVacancy, vacancy } = useVacancy();
  return (
    <div
      style={{ backgroundColor: vacancy?.colors[time[1]] }}
      onClick={() => {
        const newVacancyTimes = [...vacancy!.times];
        newVacancyTimes[index] = {
          [time[0]]:
            currentColor === vacancy?.times[index][time[0]]
              ? ""
              : currentColor || "",
        };
        const newVacancies = {
          ...vacancy!,
          times: newVacancyTimes,
        };
        setVacancy(newVacancies);
      }}
      className={styles.calendar_block}
    ></div>
  );
};
