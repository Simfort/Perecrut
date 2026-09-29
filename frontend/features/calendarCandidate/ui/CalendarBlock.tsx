import styles from "./CalendarBlock.module.css";
import { useVacancy } from "@/entities/vacancies/lib/store/useVacancy";
import { useDate } from "@/shared/lib/store/useDate";

interface CalendarBlockProps {
  time: [string, string];
  index: number;
}

export const CalendarBlock = ({ time, index }: CalendarBlockProps) => {
  const { setVacancy, vacancy } = useVacancy();
  const { date } = useDate();
  const handleClick = () => {
    const color = localStorage.getItem("color");
    if (!time[1] || time[1] === color) {
      const dateString = date.toDateString();
      const newVacancyTimes = { ...vacancy?.times };
      newVacancyTimes[dateString][index] = {
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
