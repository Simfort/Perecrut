import { useVacancy } from "@/entities/vacancies";
import { CalendarItem } from "./CalendarItem";
import styles from "./Times.module.css";
import { useDate } from "../../../shared/lib/store/useDate";

export const Times = () => {
  const { vacancy } = useVacancy();
  const { date } = useDate();
  return (
    <div>
      <ul className={styles.time_list}>
        {vacancy!.times[date.toDateString()].map((time, index) => (
          <CalendarItem index={index} time={time} key={index} />
        ))}
      </ul>
    </div>
  );
};
