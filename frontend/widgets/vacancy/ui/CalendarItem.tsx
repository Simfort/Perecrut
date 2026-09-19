import { type TimeParsed } from "@/entities/vacancies";
import styles from "./Calendar.module.css";
import { CalendarBlock } from "./CalendarBlock";

interface CalendarItemProps {
  time: TimeParsed;
  index: number;
}

export const CalendarItem = ({ time, index }: CalendarItemProps) => {
  const entries = Object.entries(time)[0];

  return (
    <li className={styles.time_item}>
      <time>{entries[0]}</time> <CalendarBlock index={index} time={entries} />
    </li>
  );
};
